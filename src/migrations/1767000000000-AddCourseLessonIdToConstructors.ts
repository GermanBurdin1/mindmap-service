import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCourseLessonIdToConstructors1767000000000 implements MigrationInterface {
  name = 'AddCourseLessonIdToConstructors1767000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'constructors',
      new TableColumn({
        name: 'courseLessonId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    // Создаем индекс для быстрого поиска конструкторов по уроку
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_constructors_courseLessonId" 
      ON "constructors" ("courseLessonId")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_constructors_courseLessonId"`);
    await queryRunner.dropColumn('constructors', 'courseLessonId');
  }
}

