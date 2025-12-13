import { ConstructorType } from '../entities/constructor.entity';

export class CreateConstructorDto {
  title!: string;
  type!: ConstructorType;
  courseId?: number | null;
  courseLessonId?: string | null; // ID урока курса (course_lessons.id)
  description?: string | null;
}

