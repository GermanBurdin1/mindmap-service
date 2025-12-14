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
  isEditable?: boolean; // Можно ли редактировать эту клетку студенту
  hints?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface DrillGridSettings {
  showAnswers?: boolean;
  randomize?: boolean;
  timeLimit?: number; // в секундах
  showHints?: boolean;
}

export type DrillGridPurpose = 'info' | 'homework';

@Entity('drill_grids')
export class DrillGrid {
  @PrimaryColumn('uuid')
  id!: string;

  @OneToOne(() => Constructor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  constructorRef!: Constructor;

  @Column({ type: 'jsonb' })
  rows!: DrillGridRow[];

  @Column({ type: 'jsonb' })
  columns!: DrillGridColumn[];

  @Column({ type: 'jsonb' })
  cells!: DrillGridCell[];

  @Column({ type: 'jsonb', nullable: true })
  settings!: DrillGridSettings | null;

  @Column({ type: 'varchar', length: 20, nullable: true, default: 'info' })
  purpose!: DrillGridPurpose | null;

  @Column({ type: 'uuid', nullable: true })
  studentUserId!: string | null;

  @Column({ type: 'uuid', nullable: true })
  originalId!: string | null;
}

