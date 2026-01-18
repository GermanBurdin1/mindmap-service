import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateArticlePatternCardsVisibility1778000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ID тем артиклей - по умолчанию должны быть public
    const articleTopicIds = [
      'd0000000-0000-0000-0000-000000000001', // Выбор артикля по роду
      'd1000000-0000-0000-0000-000000000001', // Артикли с отрицанием
      'd2000000-0000-0000-0000-000000000001', // Артикли с выражениями количества
      'd3000000-0000-0000-0000-000000000001', // Артикли после глаголов
      'd4000000-0000-0000-0000-000000000001', // Вопросительные артикли
      'd5000000-0000-0000-0000-000000000001', // Притяжательные артикли
      'd6000000-0000-0000-0000-000000000001', // Артикли с географическими названиями
      'c0000000-0000-0000-0000-000000000001', // Артикль (родительская тема)
    ];

    // Обновляем все карточки с этими topicId на public
    await queryRunner.query(`
      UPDATE pattern_cards
      SET visibility = 'public'
      WHERE "topicId" IN (${articleTopicIds.map(id => `'${id}'`).join(', ')})
      AND visibility != 'public';
    `);

    console.log(`✅ Updated pattern cards visibility to 'public' for ${articleTopicIds.length} article topics`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // При откате возвращаем видимость обратно в private
    const articleTopicIds = [
      'd0000000-0000-0000-0000-000000000001',
      'd1000000-0000-0000-0000-000000000001',
      'd2000000-0000-0000-0000-000000000001',
      'd3000000-0000-0000-0000-000000000001',
      'd4000000-0000-0000-0000-000000000001',
      'd5000000-0000-0000-0000-000000000001',
      'd6000000-0000-0000-0000-000000000001',
      'c0000000-0000-0000-0000-000000000001',
    ];

    await queryRunner.query(`
      UPDATE pattern_cards
      SET visibility = 'private'
      WHERE "topicId" IN (${articleTopicIds.map(id => `'${id}'`).join(', ')})
      AND visibility = 'public';
    `);
  }
}



