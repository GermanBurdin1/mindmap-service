import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertSamplePatternCards1769000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Генерируем UUID для конструкторов
    const constructor1Id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
    const constructor2Id = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
    const constructor3Id = 'c3d4e5f6-a7b8-9012-cdef-123456789012';

    // Вставляем конструкторы
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES
        ('${constructor1Id}', 'Je voudrais - Вежливые просьбы', 'pattern_card', '04bdb3cd-efa1-4a4f-85c1-ee000c99ab55', NULL, 'Pattern-card для выражения вежливых просьб на французском языке', NOW(), NOW()),
        ('${constructor2Id}', 'Je suis en train de - Описание действий', 'pattern_card', '04bdb3cd-efa1-4a4f-85c1-ee000c99ab55', NULL, 'Pattern-card для описания действий в процессе выполнения', NOW(), NOW()),
        ('${constructor3Id}', 'Je pense que - Выражение мнения', 'pattern_card', '04bdb3cd-efa1-4a4f-85c1-ee000c99ab55', NULL, 'Pattern-card для выражения своего мнения', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    `);

    // Pattern-Card 1: Je voudrais - Вежливые просьбы
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags)
      VALUES (
        '${constructor1Id}',
        'Je voudrais [VERB] [OBJECT]',
        'Je voudrais acheter un livre',
        '[
          {
            "id": "blank_1",
            "position": 12,
            "correctAnswer": "acheter",
            "hints": ["verbe d''action", "to buy"],
            "alternatives": ["prendre", "commander"],
            "partOfSpeech": "VERB"
          },
          {
            "id": "blank_2",
            "position": 21,
            "correctAnswer": "un livre",
            "hints": ["objet", "article + nom"],
            "alternatives": ["une voiture", "un café", "des fleurs"],
            "partOfSpeech": "OBJECT"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Je voudrais [VERB] [OBJECT] s''il vous plaît",
            "example": "Je voudrais un café s''il vous plaît",
            "context": "В ресторане или кафе"
          },
          {
            "id": "variation_2",
            "pattern": "Je voudrais bien [VERB] [OBJECT]",
            "example": "Je voudrais bien visiter Paris",
            "context": "Выражение желания"
          }
        ]'::jsonb,
        'beginner',
        'Prépositions',
        'Используется для вежливого выражения желания или просьбы. "Je voudrais" - это форма вежливости от "Je veux" (я хочу).',
        '["présent", "politesse", "demande", "verbe vouloir"]'::jsonb
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Pattern-Card 2: Je suis en train de - Описание действий
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags)
      VALUES (
        '${constructor2Id}',
        'Je suis en train de [VERB] [OBJECT]',
        'Je suis en train de lire un livre',
        '[
          {
            "id": "blank_1",
            "position": 20,
            "correctAnswer": "lire",
            "hints": ["verbe à l''infinitif", "to read"],
            "alternatives": ["écrire", "étudier", "manger"],
            "partOfSpeech": "VERB"
          },
          {
            "id": "blank_2",
            "position": 25,
            "correctAnswer": "un livre",
            "hints": ["objet direct", "article + nom"],
            "alternatives": ["mes devoirs", "une lettre", "le journal"],
            "partOfSpeech": "OBJECT"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Je suis en train de [VERB]",
            "example": "Je suis en train de travailler",
            "context": "Без прямого дополнения"
          },
          {
            "id": "variation_2",
            "pattern": "Nous sommes en train de [VERB] [OBJECT]",
            "example": "Nous sommes en train de préparer le dîner",
            "context": "Множественное число"
          }
        ]'::jsonb,
        'beginner',
        'Temps',
        'Выражение "être en train de" используется для описания действия, которое происходит прямо сейчас. Эквивалент английского "I am ...ing".',
        '["présent", "action en cours", "être en train de"]'::jsonb
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Pattern-Card 3: Je pense que - Выражение мнения
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags)
      VALUES (
        '${constructor3Id}',
        'Je pense que [SUBJECT] [VERB] [OBJECT]',
        'Je pense que c''est une bonne idée',
        '[
          {
            "id": "blank_1",
            "position": 13,
            "correctAnswer": "c''est",
            "hints": ["ce + être", "it is"],
            "alternatives": ["il est", "elle est", "tu es"],
            "partOfSpeech": "SUBJECT"
          },
          {
            "id": "blank_2",
            "position": 19,
            "correctAnswer": "une bonne idée",
            "hints": ["objet", "article + adjectif + nom"],
            "alternatives": ["bien", "intéressant", "difficile"],
            "partOfSpeech": "OBJECT"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Je pense que [SUBJECT] [VERB]",
            "example": "Je pense que tu as raison",
            "context": "Согласие с мнением"
          },
          {
            "id": "variation_2",
            "pattern": "Je ne pense pas que [SUBJECT] [VERB]",
            "example": "Je ne pense pas que ce soit vrai",
            "context": "Несогласие (требует subjonctif)"
          }
        ]'::jsonb,
        'beginner',
        'Modes',
        'Используется для выражения своего мнения или мысли. После "Je pense que" обычно следует утверждение в indicatif. Для отрицания "Je ne pense pas que" требуется subjonctif.',
        '["présent", "opinion", "penser", "indicatif"]'::jsonb
      )
      ON CONFLICT (id) DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем pattern-cards
    await queryRunner.query(`
      DELETE FROM pattern_cards 
      WHERE id IN (
        'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        'b2c3d4e5-f6a7-8901-bcde-f12345678901',
        'c3d4e5f6-a7b8-9012-cdef-123456789012'
      );
    `);

    // Удаляем конструкторы
    await queryRunner.query(`
      DELETE FROM constructors 
      WHERE id IN (
        'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        'b2c3d4e5-f6a7-8901-bcde-f12345678901',
        'c3d4e5f6-a7b8-9012-cdef-123456789012'
      );
    `);
  }
}
