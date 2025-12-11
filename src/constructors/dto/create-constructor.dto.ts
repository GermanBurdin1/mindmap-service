import { ConstructorType } from '../entities/constructor.entity';

export class CreateConstructorDto {
  title!: string;
  type!: ConstructorType;
  courseId?: number | null;
  description?: string | null;
}

