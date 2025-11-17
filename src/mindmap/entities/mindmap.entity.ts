import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MindmapNode } from './node.entity';

export type MindmapType = 'course' | 'instant' | 'personal';

@Entity()
export class Mindmap {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ type: 'varchar' })
  type!: MindmapType;

  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ type: 'int', nullable: true })
  courseId!: number | null;

  @OneToMany(() => MindmapNode, (node) => node.mindmap, { cascade: true })
  nodes!: MindmapNode[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}


