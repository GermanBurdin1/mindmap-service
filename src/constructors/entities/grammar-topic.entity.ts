import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum GrammarSection {
  MORPHOLOGY = 'morphology', // Морфология
  SYNTAX = 'syntax', // Синтаксис
  SEMANTICS = 'semantics', // Семантика
  PRAGMATICS = 'pragmatics', // Прагматика
}

@Entity('grammar_sections')
export class GrammarSectionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true })
  name!: string; // 'morphology', 'syntax', etc.

  @Column({ type: 'varchar' })
  title!: string; // 'Морфология', 'Синтаксис'

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'int', default: 0 })
  order!: number;

  @OneToMany(() => GrammarTopic, (topic) => topic.section)
  topics!: GrammarTopic[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

@Entity('grammar_topics')
export class GrammarTopic {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  sectionId!: string;

  @ManyToOne(() => GrammarSectionEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sectionId' })
  section!: GrammarSectionEntity;

  @Column({ type: 'uuid', nullable: true })
  parentTopicId!: string | null;

  @ManyToOne(() => GrammarTopic, (topic) => topic.subtopics, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parentTopicId' })
  parentTopic!: GrammarTopic | null;

  @OneToMany(() => GrammarTopic, (topic) => topic.parentTopic)
  subtopics!: GrammarTopic[];

  @Column({ type: 'varchar' })
  title!: string; // 'Части речи', 'Артикль'

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'int', default: 0 })
  level!: number; // 0 = тема, 1+ = подтема

  @Column({ type: 'int', default: 0 })
  order!: number;

  @OneToMany('PatternCard', 'topic')
  patternCards!: any[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

// Обновим PatternCard entity, чтобы добавить связь с темой
// Это будет сделано в отдельном файле или обновлении существующего
