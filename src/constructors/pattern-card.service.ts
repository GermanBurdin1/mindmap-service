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
    });
    return this.patternCardRepo.save(patternCard);
  }

  async findOne(id: string, userId: string): Promise<PatternCard | null> {
    const constructor = await this.constructorsService.findOne(id, userId);
    if (!constructor) {
      return null;
    }

    return this.patternCardRepo.findOne({ where: { id }, relations: ['constructor'] });
  }

  async update(id: string, dto: Partial<CreatePatternCardDto>, userId: string): Promise<PatternCard | null> {
    const patternCard = await this.findOne(id, userId);
    if (!patternCard) {
      return null;
    }

    Object.assign(patternCard, dto);
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
      const isCorrect =
        blank?.correctAnswer.toLowerCase().trim() === answer.answer.toLowerCase().trim() ||
        blank?.alternatives?.some((alt) => alt.toLowerCase().trim() === answer.answer.toLowerCase().trim());

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
}

