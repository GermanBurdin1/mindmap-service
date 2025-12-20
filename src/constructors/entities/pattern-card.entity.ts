import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Constructor } from './constructor.entity';
import { GrammarTopic } from './grammar-topic.entity';

export interface PatternBlank {
  id: string;
  position: number; // Позиция в строке
  correctAnswer: string;
  hints?: string[];
  alternatives?: string[]; // Альтернативные правильные ответы
  partOfSpeech?: string; // Часть речи (VERB, NOUN, ADJ и т.д.)
  type?: 'text' | 'choice'; // Тип задания: текстовый ввод или выбор из вариантов
  options?: string[]; // Варианты для выбора (используется при type === 'choice')
  label?: string; // Подпись для blank (например, "Выберите артикль")
}

export interface PatternVariation {
  id: string;
  pattern: string;
  example: string;
  context?: string; // Контекст использования
}

@Entity('pattern_cards')
export class PatternCard {
  @PrimaryColumn('uuid')
  id!: string;

  @OneToOne(() => Constructor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  constructorRef!: Constructor;

  @Column({ type: 'text' })
  pattern!: string; // Шаблон с плейсхолдерами, например: "Je voudrais [VERB] [OBJECT]"

  @Column({ type: 'text' })
  example!: string; // Пример заполненной фразы: "Je voudrais acheter un livre"

  @Column({ type: 'jsonb' })
  blanks!: PatternBlank[]; // Массив "дырок" в шаблоне

  @Column({ type: 'jsonb', nullable: true })
  variations!: PatternVariation[] | null; // Вариации шаблона

  @Column({ type: 'varchar', nullable: true })
  difficulty!: 'beginner' | 'intermediate' | 'advanced' | null;

  @Column({ type: 'varchar', nullable: true })
  category!: string | null; // Категория: 'politeness', 'formality', 'requests' и т.д.

  @Column({ type: 'text', nullable: true })
  explanation!: string | null; // Объяснение использования шаблона

  @Column({ type: 'jsonb', nullable: true })
  tags!: string[] | null; // Теги для категоризации и поиска

  @Column({ type: 'uuid', nullable: true })
  topicId!: string | null;

  @ManyToOne(() => GrammarTopic, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'topicId' })
  topic!: GrammarTopic | null;
}

