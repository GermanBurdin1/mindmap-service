import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertAdvancedArticleExercisesWithTopics1775000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const teacherUserId = '04bdb3cd-efa1-4a4f-85c1-ee000c99ab55';
    const articleTopicId = 'c0000000-0000-0000-0000-000000000001'; // Тема "Артикль"

    // Создаем новые темы для разных типов упражнений на артикли
    // Тема 1: Артикли с отрицанием
    const negationTopicId = 'd1000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO grammar_topics (id, "sectionId", "parentTopicId", title, description, level, "order", "createdAt", "updatedAt")
      VALUES (
        '${negationTopicId}',
        'a0000000-0000-0000-0000-000000000001',
        '${articleTopicId}',
        'Артикли с отрицанием',
        'Использование артикля de после отрицания pas',
        2,
        2,
        NOW(),
        NOW()
      )
      ON CONFLICT DO NOTHING;
    `);

    // Тема 2: Артикли с выражениями количества
    const quantifiersTopicId = 'd2000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO grammar_topics (id, "sectionId", "parentTopicId", title, description, level, "order", "createdAt", "updatedAt")
      VALUES (
        '${quantifiersTopicId}',
        'a0000000-0000-0000-0000-000000000001',
        '${articleTopicId}',
        'Артикли с выражениями количества',
        'Использование de после выражений количества (beaucoup, peu, assez)',
        2,
        3,
        NOW(),
        NOW()
      )
      ON CONFLICT DO NOTHING;
    `);

    // Тема 3: Артикли после глаголов
    const verbsTopicId = 'd3000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO grammar_topics (id, "sectionId", "parentTopicId", title, description, level, "order", "createdAt", "updatedAt")
      VALUES (
        '${verbsTopicId}',
        'a0000000-0000-0000-0000-000000000001',
        '${articleTopicId}',
        'Артикли после глаголов',
        'Использование артиклей после глагольных конструкций (avoir besoin de, avoir envie de)',
        2,
        4,
        NOW(),
        NOW()
      )
      ON CONFLICT DO NOTHING;
    `);

    // Тема 4: Вопросительные артикли
    const questionsTopicId = 'd4000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO grammar_topics (id, "sectionId", "parentTopicId", title, description, level, "order", "createdAt", "updatedAt")
      VALUES (
        '${questionsTopicId}',
        'a0000000-0000-0000-0000-000000000001',
        '${articleTopicId}',
        'Вопросительные артикли',
        'Выбор вопросительного артикля (Quel/Quelle/Quels/Quelles)',
        2,
        5,
        NOW(),
        NOW()
      )
      ON CONFLICT DO NOTHING;
    `);

    // Тема 5: Притяжательные артикли
    const possessiveTopicId = 'd5000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO grammar_topics (id, "sectionId", "parentTopicId", title, description, level, "order", "createdAt", "updatedAt")
      VALUES (
        '${possessiveTopicId}',
        'a0000000-0000-0000-0000-000000000001',
        '${articleTopicId}',
        'Притяжательные артикли',
        'Согласование притяжательных артиклей (mon/ma/mes, ton/ta/tes)',
        2,
        6,
        NOW(),
        NOW()
      )
      ON CONFLICT DO NOTHING;
    `);

    // Тема 6: Артикли с географическими названиями
    const geographyTopicId = 'd6000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO grammar_topics (id, "sectionId", "parentTopicId", title, description, level, "order", "createdAt", "updatedAt")
      VALUES (
        '${geographyTopicId}',
        'a0000000-0000-0000-0000-000000000001',
        '${articleTopicId}',
        'Артикли с географическими названиями',
        'Использование предлогов и артиклей с названиями стран (en/au/aux)',
        2,
        7,
        NOW(),
        NOW()
      )
      ON CONFLICT DO NOTHING;
    `);

    // Тема 7: Артикли с профессиями
    const professionsTopicId = 'd7000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO grammar_topics (id, "sectionId", "parentTopicId", title, description, level, "order", "createdAt", "updatedAt")
      VALUES (
        '${professionsTopicId}',
        'a0000000-0000-0000-0000-000000000001',
        '${articleTopicId}',
        'Артикли с профессиями',
        'Нулевой артикль при указании профессии после être',
        2,
        8,
        NOW(),
        NOW()
      )
      ON CONFLICT DO NOTHING;
    `);

    // Тема 8: Артикли в выражениях времени
    const timeTopicId = 'd8000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO grammar_topics (id, "sectionId", "parentTopicId", title, description, level, "order", "createdAt", "updatedAt")
      VALUES (
        '${timeTopicId}',
        'a0000000-0000-0000-0000-000000000001',
        '${articleTopicId}',
        'Артикли в выражениях времени',
        'Использование артиклей в выражениях времени суток (le matin, la nuit)',
        2,
        9,
        NOW(),
        NOW()
      )
      ON CONFLICT DO NOTHING;
    `);

    // Тема 9: Артикли с абстрактными понятиями
    const abstractTopicId = 'd9000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO grammar_topics (id, "sectionId", "parentTopicId", title, description, level, "order", "createdAt", "updatedAt")
      VALUES (
        '${abstractTopicId}',
        'a0000000-0000-0000-0000-000000000001',
        '${articleTopicId}',
        'Артикли с абстрактными понятиями',
        'Использование артиклей с абстрактными существительными (la liberté, l''amour)',
        2,
        10,
        NOW(),
        NOW()
      )
      ON CONFLICT DO NOTHING;
    `);

    // Тема 10: Артикли в сравнительных конструкциях
    const comparisonTopicId = 'da000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO grammar_topics (id, "sectionId", "parentTopicId", title, description, level, "order", "createdAt", "updatedAt")
      VALUES (
        '${comparisonTopicId}',
        'a0000000-0000-0000-0000-000000000001',
        '${articleTopicId}',
        'Артикли в сравнительных конструкциях',
        'Использование артиклей в сравнительных конструкциях (plus...que, moins...que)',
        2,
        11,
        NOW(),
        NOW()
      )
      ON CONFLICT DO NOTHING;
    `);

    // Обновляем существующие упражнения, чтобы они были привязаны к правильным темам
    // Упражнение 1: Артикли с отрицанием
    await queryRunner.query(`
      UPDATE pattern_cards 
      SET "topicId" = '${negationTopicId}'
      WHERE id = 'f8000000-0000-0000-0000-000000000001';
    `);

    // Упражнение 2: Артикли с выражениями количества
    await queryRunner.query(`
      UPDATE pattern_cards 
      SET "topicId" = '${quantifiersTopicId}'
      WHERE id = 'f9000000-0000-0000-0000-000000000001';
    `);

    // Упражнение 3: Артикли после глаголов
    await queryRunner.query(`
      UPDATE pattern_cards 
      SET "topicId" = '${verbsTopicId}'
      WHERE id = 'fa000000-0000-0000-0000-000000000001';
    `);

    // Упражнение 4: Вопросительные артикли
    await queryRunner.query(`
      UPDATE pattern_cards 
      SET "topicId" = '${questionsTopicId}'
      WHERE id = 'fb000000-0000-0000-0000-000000000001';
    `);

    // Упражнение 5: Притяжательные артикли
    await queryRunner.query(`
      UPDATE pattern_cards 
      SET "topicId" = '${possessiveTopicId}'
      WHERE id = 'fc000000-0000-0000-0000-000000000001';
    `);

    // Упражнение 6: Артикли с географическими названиями
    await queryRunner.query(`
      UPDATE pattern_cards 
      SET "topicId" = '${geographyTopicId}'
      WHERE id = 'fd000000-0000-0000-0000-000000000001';
    `);

    // Упражнение 7: Артикли с профессиями
    await queryRunner.query(`
      UPDATE pattern_cards 
      SET "topicId" = '${professionsTopicId}'
      WHERE id = 'fe000000-0000-0000-0000-000000000001';
    `);

    // Упражнение 8: Артикли в выражениях времени
    await queryRunner.query(`
      UPDATE pattern_cards 
      SET "topicId" = '${timeTopicId}'
      WHERE id = 'ff000000-0000-0000-0000-000000000001';
    `);

    // Упражнение 9: Артикли с абстрактными понятиями
    await queryRunner.query(`
      UPDATE pattern_cards 
      SET "topicId" = '${abstractTopicId}'
      WHERE id = 'f1000000-0000-0000-0000-000000000002';
    `);

    // Упражнение 10: Артикли в сравнительных конструкциях
    await queryRunner.query(`
      UPDATE pattern_cards 
      SET "topicId" = '${comparisonTopicId}'
      WHERE id = 'f1100000-0000-0000-0000-000000000001';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Возвращаем упражнения к исходной теме (если нужно)
    const originalTopicId = 'd0000000-0000-0000-0000-000000000001'; // "Выбор артикля по роду"
    
    await queryRunner.query(`
      UPDATE pattern_cards 
      SET "topicId" = '${originalTopicId}'
      WHERE id IN (
        'f8000000-0000-0000-0000-000000000001',
        'f9000000-0000-0000-0000-000000000001',
        'fa000000-0000-0000-0000-000000000001',
        'fb000000-0000-0000-0000-000000000001',
        'fc000000-0000-0000-0000-000000000001',
        'fd000000-0000-0000-0000-000000000001',
        'fe000000-0000-0000-0000-000000000001',
        'ff000000-0000-0000-0000-000000000001',
        'f1000000-0000-0000-0000-000000000002',
        'f1100000-0000-0000-0000-000000000001'
      );
    `);
    
    // Удаляем созданные темы
    await queryRunner.query(`
      DELETE FROM grammar_topics WHERE id IN (
        'd1000000-0000-0000-0000-000000000001',
        'd2000000-0000-0000-0000-000000000001',
        'd3000000-0000-0000-0000-000000000001',
        'd4000000-0000-0000-0000-000000000001',
        'd5000000-0000-0000-0000-000000000001',
        'd6000000-0000-0000-0000-000000000001',
        'd7000000-0000-0000-0000-000000000001',
        'd8000000-0000-0000-0000-000000000001',
        'd9000000-0000-0000-0000-000000000001',
        'da000000-0000-0000-0000-000000000001'
      );
    `);
  }
}




