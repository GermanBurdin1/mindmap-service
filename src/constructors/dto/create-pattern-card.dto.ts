import { PatternBlank, PatternVariation } from '../entities/pattern-card.entity';

export class CreatePatternCardDto {
  pattern!: string;
  example!: string;
  blanks!: PatternBlank[];
  variations?: PatternVariation[] | null;
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | null;
  category?: string | null;
  explanation?: string | null;
}

