import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    // Проверяем, что конструктор существует и принадлежит пользователю
    const constructor = await this.constructorsService.findOne(constructorId, userId);
    if (!constructor || constructor.type !== 'drill_grid') {
      return null;
    }

    // Устанавливаем purpose по умолчанию, если не указан
    const purpose = dto.purpose || 'info';
    
    // Для homework drill-grids устанавливаем studentUserId
    const studentUserId = purpose === 'homework' ? (dto.studentUserId || userId) : null;

    const drillGrid = this.drillGridRepo.create({
      id: constructorId,
      ...dto,
      purpose,
      studentUserId,
    });
    return this.drillGridRepo.save(drillGrid);
  }

  async findOne(id: string, userId: string): Promise<DrillGrid | null> {
    // Проверяем права доступа через конструктор
    const constructor = await this.constructorsService.findOne(id, userId);
    if (!constructor) {
      return null;
    }

    const drillGrid = await this.drillGridRepo.findOne({ where: { id }, relations: ['constructor'] });
    
    // Если это homework drill-grid, проверяем что студент имеет доступ
    if (drillGrid && drillGrid.purpose === 'homework' && drillGrid.studentUserId !== userId) {
      return null;
    }

    return drillGrid;
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

