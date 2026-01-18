import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddVisibilityToPatternCards1776000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Добавляем колонку visibility в pattern_cards
    await queryRunner.addColumn(
      'pattern_cards',
      new TableColumn({
        name: 'visibility',
        type: 'varchar',
        default: "'private'",
        isNullable: false,
      }),
    );

    // Обновляем существующие записи: по умолчанию все карточки приватные
    await queryRunner.query(`
      UPDATE pattern_cards 
      SET visibility = 'private' 
      WHERE visibility IS NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pattern_cards', 'visibility');
  }
}
