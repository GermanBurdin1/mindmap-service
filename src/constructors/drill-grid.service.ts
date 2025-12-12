import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { DrillGrid } from './entities/drill-grid.entity';
import { CreateDrillGridDto } from './dto/create-drill-grid.dto';
import { ConstructorsService } from './constructors.service';

@Injectable()
export class DrillGridService {
  constructor(
    @InjectRepository(DrillGrid)
    private readonly drillGridRepo: Repository<DrillGrid>,
    private readonly constructorsService: ConstructorsService,
  ) {}

  async create(constructorId: string, dto: CreateDrillGridDto, userId: string): Promise<DrillGrid | null> {
    console.log(`[DrillGridService] Creating drill-grid for constructor ${constructorId}, user ${userId}`);
    console.log(`[DrillGridService] DTO:`, JSON.stringify(dto, null, 2));
    
    // Проверяем, что конструктор существует и принадлежит пользователю
    const constructor = await this.constructorsService.findOne(constructorId, userId);
    if (!constructor) {
      console.error(`[DrillGridService] Constructor ${constructorId} not found for user ${userId}`);
      return null;
    }
    if (constructor.type !== 'drill_grid') {
      console.error(`[DrillGridService] Constructor ${constructorId} is not of type drill_grid, got: ${constructor.type}`);
      return null;
    }

    // Устанавливаем purpose по умолчанию, если не указан
    const purpose = dto.purpose || 'info';
    
    // Для homework drill-grids устанавливаем studentUserId
    const studentUserId = purpose === 'homework' ? (dto.studentUserId || userId) : null;

    console.log(`[DrillGridService] Creating drill-grid entity with:`, {
      id: constructorId,
      purpose,
      studentUserId,
      rowsCount: dto.rows?.length || 0,
      columnsCount: dto.columns?.length || 0,
      cellsCount: dto.cells?.length || 0
    });

    // Определяем originalId:
    // - Если dto.originalId явно передан (даже если null), используем его
    // - Для новых info drill-grids (шаблоны) originalId = null
    // - Для дублированных info drill-grids originalId = ID оригинала (передается в dto.originalId)
    // - Для homework drill-grids originalId = ID шаблона (передается в dto.originalId)
    // Если dto.originalId не передан (undefined), устанавливаем null для info, null для homework
    const originalId = dto.originalId !== undefined 
      ? dto.originalId 
      : null; // Если не передан явно, устанавливаем null

    console.log(`[DrillGridService] Setting originalId:`, {
      purpose,
      dtoOriginalId: dto.originalId,
      dtoHasOriginalId: dto.originalId !== undefined,
      finalOriginalId: originalId
    });

    const drillGrid = this.drillGridRepo.create({
      id: constructorId,
      ...dto,
      purpose,
      studentUserId,
      originalId: originalId,
    });
    
    const saved = await this.drillGridRepo.save(drillGrid);
    console.log(`[DrillGridService] Drill-grid saved successfully with ID: ${saved.id}`);
    return saved;
  }

  async findOne(id: string, userId: string): Promise<DrillGrid | null> {
    // Проверяем права доступа через конструктор
    const constructor = await this.constructorsService.findOne(id, userId);
    if (!constructor) {
      return null;
    }

    const drillGrid = await this.drillGridRepo.findOne({ where: { id }, relations: ['constructorRef'] });
    
    // Если это homework drill-grid, проверяем что студент имеет доступ
    if (drillGrid && drillGrid.purpose === 'homework' && drillGrid.studentUserId !== userId) {
      return null;
    }

    return drillGrid;
  }

  /**
   * Найти все drill-grids для пользователя (как созданные им, так и назначенные ему)
   */
  async findAllByUser(userId: string): Promise<DrillGrid[]> {
    try {
      console.log(`[DrillGridService] Finding drill-grids for user ${userId}`);

      // Сначала находим все конструкторы drill_grid пользователя
      const constructors = await this.constructorsService.findAll(userId, 'drill_grid');
      const constructorIds = constructors.map(c => c.id);
      
      console.log(`[DrillGridService] Found ${constructorIds.length} constructors for user`);

      let drillGrids: DrillGrid[] = [];

      if (constructorIds.length > 0) {
        // Находим все drill-grids для этих конструкторов
        // Используем query builder для правильной работы с relations и массивом ID
        drillGrids = await this.drillGridRepo
          .createQueryBuilder('drillGrid')
          .leftJoinAndSelect('drillGrid.constructorRef', 'constructor')
          .where('drillGrid.id IN (:...ids)', { ids: constructorIds })
          .orderBy('drillGrid.id', 'DESC')
          .getMany();

        console.log(`[DrillGridService] Found ${drillGrids.length} drill-grids for constructors`);
      }

      console.log(`[DrillGridService] Found ${drillGrids.length} drill-grids created by user`);

      // Также находим homework drill-grids, назначенные этому пользователю как студенту
      const homeworkGrids = await this.drillGridRepo
        .createQueryBuilder('drillGrid')
        .leftJoinAndSelect('drillGrid.constructorRef', 'constructor')
        .where('drillGrid.purpose = :purpose', { purpose: 'homework' })
        .andWhere('drillGrid.studentUserId = :userId', { userId })
        .orderBy('drillGrid.id', 'DESC')
        .getMany();

      console.log(`[DrillGridService] Found ${homeworkGrids.length} homework drill-grids assigned to user as student`);

      // Объединяем и удаляем дубликаты
      const allGrids = [...drillGrids, ...homeworkGrids];
      const uniqueGrids = Array.from(new Map(allGrids.map(g => [g.id, g])).values());
      
      console.log(`[DrillGridService] Total unique drill-grids: ${uniqueGrids.length}`);
      
      return uniqueGrids;
    } catch (error) {
      console.error(`[DrillGridService] Error in findAllByUser:`, error);
      throw error;
    }
  }

  /**
   * Найти все homework drill-grids для студента
   */
  async findHomeworkByStudent(studentUserId: string): Promise<DrillGrid[]> {
    return this.drillGridRepo.find({
      where: {
        purpose: 'homework',
        studentUserId: studentUserId,
      },
      relations: ['constructorRef'],
      order: { id: 'DESC' },
    });
  }

  /**
   * Найти все info drill-grids (шаблоны от преподавателей)
   * Доступны всем для просмотра
   */
  async findInfoTemplates(): Promise<DrillGrid[]> {
    return this.drillGridRepo.find({
      where: {
        purpose: 'info',
      },
      relations: ['constructorRef'],
      order: { id: 'DESC' },
    });
  }

  /**
   * Создать homework drill-grid для студента на основе шаблона
   */
  async createHomeworkFromTemplate(
    templateId: string,
    studentUserId: string,
    constructorId: string,
  ): Promise<DrillGrid | null> {
    // Получаем шаблон
    const template = await this.drillGridRepo.findOne({ where: { id: templateId } });
    if (!template || template.purpose !== 'info') {
      return null;
    }

    // Проверяем, что конструктор существует и принадлежит студенту
    const constructor = await this.constructorsService.findOne(constructorId, studentUserId);
    if (!constructor || constructor.type !== 'drill_grid') {
      return null;
    }

    // Создаем homework drill-grid с пустыми ячейками
    const homeworkGrid = this.drillGridRepo.create({
      id: constructorId,
      rows: template.rows,
      columns: template.columns,
      cells: [], // Пустые ячейки для заполнения студентом
      settings: template.settings,
      purpose: 'homework',
      studentUserId: studentUserId,
      originalId: template.id,
    });

    return this.drillGridRepo.save(homeworkGrid);
  }

  async update(id: string, dto: Partial<CreateDrillGridDto>, userId: string): Promise<DrillGrid | null> {
    const drillGrid = await this.findOne(id, userId);
    if (!drillGrid) {
      return null;
    }

    // Для info drill-grids запрещаем редактирование (только просмотр)
    if (drillGrid.purpose === 'info') {
      throw new Error('Cannot update info drill-grid. It is read-only.');
    }

    // Для homework drill-grids проверяем, что редактирует владелец
    if (drillGrid.purpose === 'homework' && drillGrid.studentUserId !== userId) {
      throw new Error('Cannot update homework drill-grid. Access denied.');
    }

    Object.assign(drillGrid, dto);
    return this.drillGridRepo.save(drillGrid);
  }

  async validateAnswers(id: string, answers: { rowId: string; colId: string; answer: string }[], userId: string) {
    const drillGrid = await this.findOne(id, userId);
    if (!drillGrid) {
      return null;
    }

    const results = answers.map((answer) => {
      const cell = drillGrid.cells.find(
        (c) => c.rowId === answer.rowId && c.colId === answer.colId,
      );
      const isCorrect = cell?.correctAnswer?.toLowerCase().trim() === answer.answer.toLowerCase().trim();
      return {
        ...answer,
        isCorrect,
        correctAnswer: cell?.correctAnswer,
        hints: cell?.hints,
      };
    });

    return {
      results,
      score: results.filter((r) => r.isCorrect).length / results.length,
    };
  }
}

