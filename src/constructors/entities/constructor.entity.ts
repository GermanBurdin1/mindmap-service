import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type ConstructorType = 'mindmap' | 'drill_grid' | 'pattern_card' | 'flowchart';

@Entity('constructors')
export class Constructor {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ type: 'varchar' })
  type!: ConstructorType;

  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ type: 'int', nullable: true })
  courseId!: number | null;

  @Column({ type: 'uuid', nullable: true })
  courseLessonId!: string | null; // Связь с уроком курса (course_lessons.id)

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

