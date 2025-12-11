import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Constructor } from './constructor.entity';

export type FlowchartNodeType = 'decision' | 'action' | 'result' | 'start' | 'end';

export interface FlowchartNode {
  id: string;
  type: FlowchartNodeType;
  label: string;
  question?: string; // Вопрос для decision узлов
  conditions?: string[]; // Варианты ответов для decision узлов
  result?: string; // Результат для result узлов
  action?: string; // Действие для action узлов
  position?: { x: number; y: number }; // Позиция на схеме
  hints?: string[]; // Подсказки
}

export interface FlowchartEdge {
  id: string;
  from: string; // ID узла источника
  to: string; // ID узла назначения
  condition?: string; // Условие перехода (для decision узлов)
  label?: string; // Метка на стрелке
}

export interface FlowchartSettings {
  showHints?: boolean;
  autoAdvance?: boolean; // Автоматически переходить к следующему узлу
  showProgress?: boolean; // Показывать прогресс прохождения
}

@Entity('flowcharts')
export class Flowchart {
  @PrimaryColumn('uuid')
  id!: string;

  @OneToOne(() => Constructor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  constructor!: Constructor;

  @Column({ type: 'jsonb' })
  nodes!: FlowchartNode[]; // Узлы схемы

  @Column({ type: 'jsonb' })
  edges!: FlowchartEdge[]; // Связи между узлами

  @Column({ type: 'uuid' })
  startNodeId!: string; // ID начального узла

  @Column({ type: 'jsonb', nullable: true })
  settings!: FlowchartSettings | null;
}

