import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Constructor } from './constructor.entity';

export interface DrillGridRow {
  id: string;
  label: string;
  examples?: string[];
}

export interface DrillGridColumn {
  id: string;
  label: string;
  examples?: string[];
}

export interface DrillGridCell {
  rowId: string;
  colId: string;
  content: string;
  correctAnswer?: string;
  hints?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface DrillGridSettings {
  showAnswers?: boolean;
  randomize?: boolean;
  timeLimit?: number; // в секундах
  showHints?: boolean;
}

@Entity('drill_grids')
export class DrillGrid {
  @PrimaryColumn('uuid')
  id!: string;

  @OneToOne(() => Constructor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  constructor!: Constructor;

  @Column({ type: 'jsonb' })
  rows!: DrillGridRow[];

  @Column({ type: 'jsonb' })
  columns!: DrillGridColumn[];

  @Column({ type: 'jsonb' })
  cells!: DrillGridCell[];

  @Column({ type: 'jsonb', nullable: true })
  settings!: DrillGridSettings | null;
}

