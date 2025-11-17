import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class AddMindmapAndLinkNodes1750000001000 implements MigrationInterface {
  name = 'AddMindmapAndLinkNodes1750000001000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Создаём таблицу mindmap
    await queryRunner.createTable(
      new Table({
        name: 'mindmap',
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
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'courseId',
            type: 'int',
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

    // Добавляем колонку mindmapId в mindmap_node
    await queryRunner.addColumn(
      'mindmap_node',
      new TableColumn({
        name: 'mindmapId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    // Внешний ключ mindmap_node.mindmapId -> mindmap.id
    await queryRunner.createForeignKey(
      'mindmap_node',
      new TableForeignKey({
        columnNames: ['mindmapId'],
        referencedTableName: 'mindmap',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем внешний ключ
    const table = await queryRunner.getTable('mindmap_node');
    const fk = table?.foreignKeys.find((f) => f.columnNames.includes('mindmapId'));
    if (fk) {
      await queryRunner.dropForeignKey('mindmap_node', fk);
    }

    // Удаляем колонку
    await queryRunner.dropColumn('mindmap_node', 'mindmapId');

    // Удаляем таблицу mindmap
    await queryRunner.dropTable('mindmap');
  }
}


