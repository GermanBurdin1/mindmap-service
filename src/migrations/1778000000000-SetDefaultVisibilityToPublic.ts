import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class SetDefaultVisibilityToPublic1778000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Изменяем дефолтное значение visibility на 'public'
    await queryRunner.changeColumn(
      'pattern_cards',
      'visibility',
      new TableColumn({
        name: 'visibility',
        type: 'varchar',
        default: "'public'",
        isNullable: false,
      }),
    );

    // Обновляем все существующие записи без явной видимости на 'public'
    await queryRunner.query(`
      UPDATE pattern_cards 
      SET visibility = 'public' 
      WHERE visibility IS NULL OR visibility = '';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Возвращаем дефолтное значение обратно на 'private'
    await queryRunner.changeColumn(
      'pattern_cards',
      'visibility',
      new TableColumn({
        name: 'visibility',
        type: 'varchar',
        default: "'private'",
        isNullable: false,
      }),
    );
  }
}



