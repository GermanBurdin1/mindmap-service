import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddDrillGridPurposeFields1766000000000 implements MigrationInterface {
  name = 'AddDrillGridPurposeFields1766000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Добавляем поле purpose для разделения на info и homework
    await queryRunner.addColumn(
      'drill_grids',
      new TableColumn({
        name: 'purpose',
        type: 'varchar',
        length: '20',
        isNullable: true,
        default: "'info'",
        comment: "Purpose of drill-grid: 'info' for read-only templates, 'homework' for student assignments",
      }),
    );

    // Добавляем поле studentUserId для homework drill-grids
    await queryRunner.addColumn(
      'drill_grids',
      new TableColumn({
        name: 'studentUserId',
        type: 'uuid',
        isNullable: true,
        comment: 'ID of student who owns this homework drill-grid',
      }),
    );

    // Добавляем поле originalId для связи homework drill-grid с оригинальным шаблоном
    await queryRunner.addColumn(
      'drill_grids',
      new TableColumn({
        name: 'originalId',
        type: 'uuid',
        isNullable: true,
        comment: 'ID of original template drill-grid (for homework drill-grids)',
      }),
    );

    // Добавляем CHECK constraint для purpose
    await queryRunner.query(`
      ALTER TABLE "drill_grids" 
      ADD CONSTRAINT "CHK_drill_grid_purpose" 
      CHECK (purpose IS NULL OR purpose IN ('info', 'homework'))
    `);

    // Создаем индекс для быстрого поиска homework drill-grids по студенту
    await queryRunner.query(`
      CREATE INDEX "IDX_drill_grids_studentUserId" 
      ON "drill_grids" ("studentUserId")
      WHERE "studentUserId" IS NOT NULL
    `);

    // Создаем индекс для поиска homework drill-grids по оригинальному шаблону
    await queryRunner.query(`
      CREATE INDEX "IDX_drill_grids_originalId" 
      ON "drill_grids" ("originalId")
      WHERE "originalId" IS NOT NULL
    `);

    // Обновляем существующие записи - устанавливаем purpose = 'info' по умолчанию
    await queryRunner.query(`
      UPDATE "drill_grids" 
      SET "purpose" = 'info' 
      WHERE "purpose" IS NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем индексы
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_drill_grids_originalId"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_drill_grids_studentUserId"`);

    // Удаляем CHECK constraint
    await queryRunner.query(`ALTER TABLE "drill_grids" DROP CONSTRAINT IF EXISTS "CHK_drill_grid_purpose"`);

    // Удаляем колонки
    await queryRunner.dropColumn('drill_grids', 'originalId');
    await queryRunner.dropColumn('drill_grids', 'studentUserId');
    await queryRunner.dropColumn('drill_grids', 'purpose');
  }
}
