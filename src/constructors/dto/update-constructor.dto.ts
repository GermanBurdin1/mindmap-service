export class UpdateConstructorDto {
  title?: string;
  description?: string | null;
  courseId?: number | null; // Можно обновить привязку к курсу
  courseLessonId?: string | null; // Можно обновить привязку к уроку
}

