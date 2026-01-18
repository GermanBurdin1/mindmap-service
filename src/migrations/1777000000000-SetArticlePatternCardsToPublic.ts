import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetArticlePatternCardsToPublic1777000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ID темы "Артикль" (level 1, родитель для всех подтем артиклей)
    const articleTopicId = 'c0000000-0000-0000-0000-000000000001';

    // Обновляем все карточки, которые привязаны к теме "Артикль" или её подтемам
    // Используем рекурсивный CTE для поиска всех подтем артиклей
    await queryRunner.query(`
      WITH RECURSIVE article_topics AS (
        -- Базовая тема "Артикль"
        SELECT id, "parentTopicId", title
        FROM grammar_topics
        WHERE id = '${articleTopicId}'
        
        UNION ALL
        
        -- Все подтемы артиклей
        SELECT gt.id, gt."parentTopicId", gt.title
        FROM grammar_topics gt
        INNER JOIN article_topics at ON gt."parentTopicId" = at.id
      )
      UPDATE pattern_cards
      SET visibility = 'public'
      WHERE "topicId" IN (
        SELECT id FROM article_topics
      )
      AND visibility != 'public';
    `);

    // Также обновляем карточки, у которых topicId указывает на тему с названием, содержащим "артикль" или "article"
    await queryRunner.query(`
      UPDATE pattern_cards pc
      SET visibility = 'public'
      WHERE EXISTS (
        SELECT 1
        FROM grammar_topics gt
        WHERE gt.id = pc."topicId"
        AND (
          LOWER(gt.title) LIKE '%артикль%'
          OR LOWER(gt.title) LIKE '%article%'
        )
      )
      AND pc.visibility != 'public';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // При откате миграции возвращаем видимость обратно в private
    const articleTopicId = 'c0000000-0000-0000-0000-000000000001';

    await queryRunner.query(`
      WITH RECURSIVE article_topics AS (
        SELECT id, "parentTopicId", title
        FROM grammar_topics
        WHERE id = '${articleTopicId}'
        
        UNION ALL
        
        SELECT gt.id, gt."parentTopicId", gt.title
        FROM grammar_topics gt
        INNER JOIN article_topics at ON gt."parentTopicId" = at.id
      )
      UPDATE pattern_cards
      SET visibility = 'private'
      WHERE "topicId" IN (
        SELECT id FROM article_topics
      )
      AND visibility = 'public';
    `);
  }
}



