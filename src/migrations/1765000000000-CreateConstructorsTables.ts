import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class CreateConstructorsTables1765000000000 implements MigrationInterface {
  name = 'CreateConstructorsTables1765000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Создаем общую таблицу constructors
    await queryRunner.createTable(
      new Table({
        name: 'constructors',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'courseId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Добавляем ограничение CHECK для типа конструктора
    await queryRunner.query(`
      ALTER TABLE "constructors" 
      ADD CONSTRAINT "CHK_constructor_type" 
      CHECK (type IN ('mindmap', 'drill_grid', 'pattern_card', 'flowchart'))
    `);

    // Создаем индексы
    await queryRunner.createIndex(
      'constructors',
      new TableIndex({
        name: 'IDX_constructors_userId',
        columnNames: ['userId'],
      }),
    );

    await queryRunner.createIndex(
      'constructors',
      new TableIndex({
        name: 'IDX_constructors_type',
        columnNames: ['type'],
      }),
    );

    await queryRunner.createIndex(
      'constructors',
      new TableIndex({
        name: 'IDX_constructors_courseId',
        columnNames: ['courseId'],
      }),
    );

    // Создаем таблицу drill_grids
    await queryRunner.createTable(
      new Table({
        name: 'drill_grids',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'rows',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'columns',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'cells',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'settings',
            type: 'jsonb',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Внешний ключ drill_grids.id -> constructors.id
    await queryRunner.createForeignKey(
      'drill_grids',
      new TableForeignKey({
        columnNames: ['id'],
        referencedTableName: 'constructors',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // Создаем таблицу pattern_cards
    await queryRunner.createTable(
      new Table({
        name: 'pattern_cards',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'pattern',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'example',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'blanks',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'variations',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'difficulty',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'category',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'explanation',
            type: 'text',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Внешний ключ pattern_cards.id -> constructors.id
    await queryRunner.createForeignKey(
      'pattern_cards',
      new TableForeignKey({
        columnNames: ['id'],
        referencedTableName: 'constructors',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // Создаем таблицу flowcharts
    await queryRunner.createTable(
      new Table({
        name: 'flowcharts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'nodes',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'edges',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'startNodeId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'settings',
            type: 'jsonb',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Внешний ключ flowcharts.id -> constructors.id
    await queryRunner.createForeignKey(
      'flowcharts',
      new TableForeignKey({
        columnNames: ['id'],
        referencedTableName: 'constructors',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем таблицы в обратном порядке
    await queryRunner.dropTable('flowcharts', true);
    await queryRunner.dropTable('pattern_cards', true);
    await queryRunner.dropTable('drill_grids', true);
    await queryRunner.dropTable('constructors', true);
  }
}

