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

    const drillGrid = this.drillGridRepo.create({
      id: constructorId,
      ...dto,
    });
    return this.drillGridRepo.save(drillGrid);
  }

  async findOne(id: string, userId: string): Promise<DrillGrid | null> {
    // Проверяем права доступа через конструктор
    const constructor = await this.constructorsService.findOne(id, userId);
    if (!constructor) {
      return null;
    }

    return this.drillGridRepo.findOne({ where: { id }, relations: ['constructor'] });
  }

  async update(id: string, dto: Partial<CreateDrillGridDto>, userId: string): Promise<DrillGrid | null> {
    const drillGrid = await this.findOne(id, userId);
    if (!drillGrid) {
      return null;
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

