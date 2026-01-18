import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatternCard } from './entities/pattern-card.entity';
import { CreatePatternCardDto } from './dto/create-pattern-card.dto';
import { ConstructorsService } from './constructors.service';

@Injectable()
export class PatternCardService {
  constructor(
    @InjectRepository(PatternCard)
    private readonly patternCardRepo: Repository<PatternCard>,
    private readonly constructorsService: ConstructorsService,
  ) {}

  async create(constructorId: string, dto: CreatePatternCardDto, userId: string): Promise<PatternCard | null> {
    const constructor = await this.constructorsService.findOne(constructorId, userId);
    if (!constructor || constructor.type !== 'pattern_card') {
      return null;
    }

    const patternCard = this.patternCardRepo.create({
      id: constructorId,
      ...dto,
      visibility: dto.visibility || 'public',
    });
    return this.patternCardRepo.save(patternCard);
  }

  async findOne(id: string, userId: string): Promise<PatternCard | null> {
    const constructor = await this.constructorsService.findOne(id, userId);
    if (!constructor) {
      return null;
    }

    return this.patternCardRepo.findOne({ where: { id }, relations: ['constructorRef'] });
  }

  async update(id: string, dto: Partial<CreatePatternCardDto>, userId: string): Promise<PatternCard | null> {
    const patternCard = await this.findOne(id, userId);
    if (!patternCard) {
      return null;
    }

    // Обновляем только переданные поля
    if (dto.pattern !== undefined) patternCard.pattern = dto.pattern;
    if (dto.example !== undefined) patternCard.example = dto.example;
    if (dto.blanks !== undefined) patternCard.blanks = dto.blanks;
    if (dto.variations !== undefined) patternCard.variations = dto.variations;
    if (dto.difficulty !== undefined) patternCard.difficulty = dto.difficulty;
    if (dto.category !== undefined) patternCard.category = dto.category;
    if (dto.explanation !== undefined) patternCard.explanation = dto.explanation;
    if (dto.tags !== undefined) patternCard.tags = dto.tags;
    if (dto.topicId !== undefined) patternCard.topicId = dto.topicId;
    if (dto.visibility !== undefined) patternCard.visibility = dto.visibility;

    return this.patternCardRepo.save(patternCard);
  }

  async getStage(id: string, stage: 'example' | 'blanks' | 'spontaneous', userId: string) {
    const patternCard = await this.findOne(id, userId);
    if (!patternCard) {
      return null;
    }

    switch (stage) {
      case 'example':
        return {
          pattern: patternCard.pattern,
          example: patternCard.example,
          explanation: patternCard.explanation,
        };
      case 'blanks':
        // Генерируем шаблон с дырками
        let patternWithBlanks = patternCard.pattern;
        patternCard.blanks
          .sort((a, b) => b.position - a.position) // Сортируем в обратном порядке для замены
          .forEach((blank) => {
            patternWithBlanks = patternWithBlanks.replace(
              new RegExp(`\\[${blank.partOfSpeech || 'BLANK'}\\]`, 'g'),
              '_____',
            );
          });
        return {
          pattern: patternWithBlanks,
          blanks: patternCard.blanks,
          hints: patternCard.blanks.map((b) => b.hints || []),
        };
      case 'spontaneous':
        return {
          pattern: patternCard.pattern,
          variations: patternCard.variations,
        };
      default:
        return null;
    }
  }

  async fillPattern(id: string, answers: { blankId: string; answer: string }[], userId: string) {
    const patternCard = await this.findOne(id, userId);
    if (!patternCard) {
      return null;
    }

    const results = answers.map((answer) => {
      const blank = patternCard.blanks.find((b) => b.id === answer.blankId);
      const userAnswer = answer.answer?.trim() || '';
      const correctAnswer = blank?.correctAnswer?.trim() || '';
      const isCorrect =
        userAnswer === correctAnswer ||
        blank?.alternatives?.some((alt) => (alt?.trim() || '') === userAnswer);

      return {
        blankId: answer.blankId,
        answer: answer.answer,
        isCorrect,
        correctAnswer: blank?.correctAnswer,
        alternatives: blank?.alternatives,
      };
    });

    return {
      results,
      filledPattern: this.generateFilledPattern(patternCard.pattern, patternCard.blanks, answers),
    };
  }

  private generateFilledPattern(pattern: string, blanks: any[], answers: { blankId: string; answer: string }[]): string {
    let filled = pattern;
    blanks.forEach((blank) => {
      const answer = answers.find((a) => a.blankId === blank.id);
      if (answer) {
        filled = filled.replace(
          new RegExp(`\\[${blank.partOfSpeech || 'BLANK'}\\]`, 'g'),
          answer.answer,
        );
      }
    });
    return filled;
  }

  // Получить публичные карточки (доступны всем)
  async findPublicCards(currentUserId?: string): Promise<PatternCard[]> {
    const queryBuilder = this.patternCardRepo
      .createQueryBuilder('pc')
      .innerJoin('constructors', 'c', 'c.id = pc.id')
      .where('pc.visibility = :visibility', { visibility: 'public' })
      .select([
        'pc.id',
        'pc.pattern',
        'pc.example',
        'pc.blanks',
        'pc.variations',
        'pc.difficulty',
        'pc.category',
        'pc.explanation',
        'pc.tags',
        'pc.topicId',
        'pc.visibility',
        'c.title',
        'c.userId',
      ]);

    const results = await queryBuilder.getRawMany();
    return results.map((row) => ({
      id: row.pc_id,
      pattern: row.pc_pattern,
      example: row.pc_example,
      blanks: row.pc_blanks,
      variations: row.pc_variations,
      difficulty: row.pc_difficulty,
      category: row.pc_category,
      explanation: row.pc_explanation,
      tags: row.pc_tags,
      topicId: row.pc_topicId,
      visibility: row.pc_visibility,
      constructorTitle: row.c_title,
      constructorUserId: row.c_userId,
    })) as any;
  }

  // Получить карточки для студентов (public + students)
  async findCardsForStudents(currentUserId?: string): Promise<PatternCard[]> {
    const queryBuilder = this.patternCardRepo
      .createQueryBuilder('pc')
      .innerJoin('constructors', 'c', 'c.id = pc.id')
      .where('pc.visibility IN (:...visibilities)', { visibilities: ['public', 'students'] })
      .select([
        'pc.id',
        'pc.pattern',
        'pc.example',
        'pc.blanks',
        'pc.variations',
        'pc.difficulty',
        'pc.category',
        'pc.explanation',
        'pc.tags',
        'pc.topicId',
        'pc.visibility',
        'c.title',
        'c.userId',
      ]);

    const results = await queryBuilder.getRawMany();
    return results.map((row) => ({
      id: row.pc_id,
      pattern: row.pc_pattern,
      example: row.pc_example,
      blanks: row.pc_blanks,
      variations: row.pc_variations,
      difficulty: row.pc_difficulty,
      category: row.pc_category,
      explanation: row.pc_explanation,
      tags: row.pc_tags,
      topicId: row.pc_topicId,
      visibility: row.pc_visibility,
      constructorTitle: row.c_title,
      constructorUserId: row.c_userId,
    })) as any;
  }
}



