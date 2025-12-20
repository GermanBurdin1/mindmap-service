import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertGrammarPatternCard1771000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const constructorId = 'e0000000-0000-0000-0000-000000000001';
    const topicId = 'd0000000-0000-0000-0000-000000000001'; // Подтема "Выбор артикля по роду"
    const teacherUserId = '04bdb3cd-efa1-4a4f-85c1-ee000c99ab55';

    // Создаем конструктор для pattern-card
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${constructorId}',
        'Выбор артикля le/la по роду существительного',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Pattern-card для тренировки выбора определенного артикля в зависимости от рода существительного',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Создаем pattern-card с привязкой к теме
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${constructorId}',
        'Je voudrais [ARTICLE] livre',
        'Je voudrais le livre',
        '[
          {
            "id": "blank_1",
            "position": 12,
            "correctAnswer": "le",
            "hints": ["артикль мужского рода", "определенный артикль"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["le", "la"],
            "label": "Choisissez l''article"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Je voudrais [ARTICLE] [NOUN] s''il vous plaît",
            "example": "Je voudrais la voiture s''il vous plaît",
            "context": "В магазине или при заказе"
          },
          {
            "id": "variation_2",
            "pattern": "J''ai besoin de [ARTICLE] [NOUN]",
            "example": "J''ai besoin de la clé",
            "context": "Выражение потребности"
          }
        ]'::jsonb,
        'beginner',
        'Articles',
        'Упражнение на выбор определенного артикля le (мужской род) или la (женский род) в зависимости от рода существительного. Мужской род: le livre, le cahier. Женский род: la voiture, la clé.',
        '["артикль", "род", "le", "la", "мужской род", "женский род"]'::jsonb,
        '${topicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM pattern_cards WHERE id = 'e0000000-0000-0000-0000-000000000001';
    `);
    await queryRunner.query(`
      DELETE FROM constructors WHERE id = 'e0000000-0000-0000-0000-000000000001';
    `);
  }
}
