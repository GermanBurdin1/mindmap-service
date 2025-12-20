import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class CreateGrammarHierarchy1770000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Создаем таблицу grammar_sections
    await queryRunner.createTable(
      new Table({
        name: 'grammar_sections',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'order',
            type: 'int',
            default: 0,
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

    // Создаем таблицу grammar_topics
    await queryRunner.createTable(
      new Table({
        name: 'grammar_topics',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'sectionId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'parentTopicId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'level',
            type: 'int',
            default: 0,
          },
          {
            name: 'order',
            type: 'int',
            default: 0,
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

    // Добавляем внешние ключи для grammar_topics
    await queryRunner.createForeignKey(
      'grammar_topics',
      new TableForeignKey({
        columnNames: ['sectionId'],
        referencedTableName: 'grammar_sections',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'grammar_topics',
      new TableForeignKey({
        columnNames: ['parentTopicId'],
        referencedTableName: 'grammar_topics',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // Добавляем индексы
    await queryRunner.createIndex(
      'grammar_topics',
      new TableIndex({
        name: 'IDX_grammar_topics_sectionId',
        columnNames: ['sectionId'],
      }),
    );

    await queryRunner.createIndex(
      'grammar_topics',
      new TableIndex({
        name: 'IDX_grammar_topics_parentTopicId',
        columnNames: ['parentTopicId'],
      }),
    );

    // Добавляем колонку topicId в pattern_cards
    await queryRunner.addColumn(
      'pattern_cards',
      new TableColumn({
        name: 'topicId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    // Добавляем внешний ключ для pattern_cards
    await queryRunner.createForeignKey(
      'pattern_cards',
      new TableForeignKey({
        columnNames: ['topicId'],
        referencedTableName: 'grammar_topics',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    // Создаем данные для примера
    // Раздел: Морфология
    await queryRunner.query(`
      INSERT INTO grammar_sections (id, name, title, description, "order", "createdAt", "updatedAt")
      VALUES (
        'a0000000-0000-0000-0000-000000000001',
        'morphology',
        'Морфология',
        'Изучение структуры слов и их форм',
        1,
        NOW(),
        NOW()
      )
      ON CONFLICT DO NOTHING;
    `);

    // Тема: Части речи
    await queryRunner.query(`
      INSERT INTO grammar_topics (id, "sectionId", "parentTopicId", title, description, level, "order", "createdAt", "updatedAt")
      VALUES (
        'b0000000-0000-0000-0000-000000000001',
        'a0000000-0000-0000-0000-000000000001',
        NULL,
        'Части речи',
        'Основные категории слов во французском языке',
        0,
        1,
        NOW(),
        NOW()
      )
      ON CONFLICT DO NOTHING;
    `);

    // Подтема 1 уровня: Артикль
    await queryRunner.query(`
      INSERT INTO grammar_topics (id, "sectionId", "parentTopicId", title, description, level, "order", "createdAt", "updatedAt")
      VALUES (
        'c0000000-0000-0000-0000-000000000001',
        'a0000000-0000-0000-0000-000000000001',
        'b0000000-0000-0000-0000-000000000001',
        'Артикль',
        'Определенные и неопределенные артикли',
        1,
        1,
        NOW(),
        NOW()
      )
      ON CONFLICT DO NOTHING;
    `);

    // Подтема 2 уровня: Артикль мужского/женского рода
    await queryRunner.query(`
      INSERT INTO grammar_topics (id, "sectionId", "parentTopicId", title, description, level, "order", "createdAt", "updatedAt")
      VALUES (
        'd0000000-0000-0000-0000-000000000001',
        'a0000000-0000-0000-0000-000000000001',
        'c0000000-0000-0000-0000-000000000001',
        'Выбор артикля по роду',
        'Выбор определенного артикля le/la в зависимости от рода существительного',
        2,
        1,
        NOW(),
        NOW()
      )
      ON CONFLICT DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем внешний ключ и колонку из pattern_cards
    const patternCardsTable = await queryRunner.getTable('pattern_cards');
    const topicIdForeignKey = patternCardsTable?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('topicId') !== -1,
    );
    if (topicIdForeignKey) {
      await queryRunner.dropForeignKey('pattern_cards', topicIdForeignKey);
    }
    await queryRunner.dropColumn('pattern_cards', 'topicId');

    // Удаляем таблицы
    await queryRunner.dropTable('grammar_topics', true);
    await queryRunner.dropTable('grammar_sections', true);
  }
}
