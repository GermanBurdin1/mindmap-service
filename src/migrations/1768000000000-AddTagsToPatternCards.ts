import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTagsToPatternCards1768000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pattern_cards',
      new TableColumn({
        name: 'tags',
        type: 'jsonb',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pattern_cards', 'tags');
  }
}
