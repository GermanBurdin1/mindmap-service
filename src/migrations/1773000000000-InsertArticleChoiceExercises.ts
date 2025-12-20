import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertArticleChoiceExercises1773000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const teacherUserId = '04bdb3cd-efa1-4a4f-85c1-ee000c99ab55';
    const topicId = 'd0000000-0000-0000-0000-000000000001'; // Подтема "Выбор артикля по роду"

    // Упражнение 1: Неопределенные артикли un/une (начальный уровень)
    const card1Id = 'f1000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${card1Id}',
        'Un ou une? - Неопределенные артикли',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Упражнение на выбор неопределенного артикля un (мужской род) или une (женский род)',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${card1Id}',
        'J''ai [ARTICLE] chat',
        'J''ai un chat',
        '[
          {
            "id": "blank_1",
            "position": 5,
            "correctAnswer": "un",
            "hints": ["неопределенный артикль", "мужской род", "chat - мужского рода"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["un", "une", "le", "la", "des"],
            "label": "Choisissez l''article indéfini"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Il a [ARTICLE] voiture",
            "example": "Il a une voiture",
            "context": "Владение предметом"
          },
          {
            "id": "variation_2",
            "pattern": "Elle veut [ARTICLE] maison",
            "example": "Elle veut une maison",
            "context": "Желание или потребность"
          }
        ]'::jsonb,
        'beginner',
        'Articles',
        'Упражнение на выбор неопределенного артикля un (мужской род) или une (женский род). Un chat, un livre. Une voiture, une maison.',
        '["артикль", "неопределенный", "un", "une", "мужской род", "женский род"]'::jsonb,
        '${topicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Упражнение 2: Артикль l' перед гласными (начальный-средний уровень)
    const card2Id = 'f2000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${card2Id}',
        'L''article - Артикль перед гласными',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Упражнение на использование артикля l'' перед словами, начинающимися с гласной',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${card2Id}',
        'Je vois [ARTICLE] arbre',
        'Je vois l''arbre',
        '[
          {
            "id": "blank_1",
            "position": 8,
            "correctAnswer": "l''",
            "hints": ["артикль перед гласной", "arbre начинается с гласной a", "используется l'' вместо le или la"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["l''", "le", "la", "les", "un", "une"],
            "label": "Choisissez l''article (attention à la voyelle)"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Il admire [ARTICLE] étoile",
            "example": "Il admire l''étoile",
            "context": "Наблюдение или восхищение"
          },
          {
            "id": "variation_2",
            "pattern": "Elle ouvre [ARTICLE] fenêtre",
            "example": "Elle ouvre l''fenêtre",
            "context": "Действие с предметом"
          }
        ]'::jsonb,
        'beginner',
        'Articles',
        'Упражнение на использование артикля l'' перед словами, начинающимися с гласной или немой h. L''arbre, l''étoile, l''homme.',
        '["артикль", "l''", "гласная", "elision"]'::jsonb,
        '${topicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Упражнение 3: Частичные артикли du/de la/des (средний уровень)
    const card3Id = 'f3000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${card3Id}',
        'Du, de la, des - Частичные артикли',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Упражнение на выбор частичного артикля для неисчисляемых существительных',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${card3Id}',
        'Je veux [ARTICLE] pain',
        'Je veux du pain',
        '[
          {
            "id": "blank_1",
            "position": 8,
            "correctAnswer": "du",
            "hints": ["частичный артикль", "мужской род", "неисчисляемое существительное", "pain - мужского рода"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["du", "de la", "des", "le", "la", "un"],
            "label": "Choisissez l''article partitif"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Il boit [ARTICLE] eau",
            "example": "Il boit de l''eau",
            "context": "Употребление напитков"
          },
          {
            "id": "variation_2",
            "pattern": "Elle achète [ARTICLE] farine",
            "example": "Elle achète de la farine",
            "context": "Покупка продуктов"
          }
        ]'::jsonb,
        'intermediate',
        'Articles',
        'Упражнение на выбор частичного артикля для неисчисляемых существительных. Du pain (мужской род), de la farine (женский род), de l''eau (перед гласной), des légumes (множественное число).',
        '["артикль", "частичный", "du", "de la", "des", "неисчисляемые"]'::jsonb,
        '${topicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Упражнение 4: Слитные артикли au/aux (средний уровень)
    const card4Id = 'f4000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${card4Id}',
        'Au, aux - Слитные артикли с à',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Упражнение на использование слитных артиклей au (à + le) и aux (à + les)',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${card4Id}',
        'Je vais [ARTICLE] marché',
        'Je vais au marché',
        '[
          {
            "id": "blank_1",
            "position": 8,
            "correctAnswer": "au",
            "hints": ["слитный артикль", "à + le = au", "мужской род единственное число", "направление движения"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["au", "aux", "à le", "à la", "à les", "du"],
            "label": "Choisissez l''article contracté avec à"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Nous allons [ARTICLE] magasins",
            "example": "Nous allons aux magasins",
            "context": "Множественное число - aux"
          },
          {
            "id": "variation_2",
            "pattern": "Il pense [ARTICLE] problème",
            "example": "Il pense au problème",
            "context": "Размышление о чем-то"
          }
        ]'::jsonb,
        'intermediate',
        'Articles',
        'Упражнение на использование слитных артиклей с предлогом à. Au (à + le) для мужского рода единственного числа, aux (à + les) для множественного числа, à la для женского рода.',
        '["артикль", "слитный", "au", "aux", "à + le", "à + les"]'::jsonb,
        '${topicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Упражнение 5: Слитные артикли du/des (средний-продвинутый уровень)
    const card5Id = 'f5000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${card5Id}',
        'Du, des - Слитные артикли с de',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Упражнение на использование слитных артиклей du (de + le) и des (de + les)',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${card5Id}',
        'Le livre [ARTICLE] professeur',
        'Le livre du professeur',
        '[
          {
            "id": "blank_1",
            "position": 10,
            "correctAnswer": "du",
            "hints": ["слитный артикль", "de + le = du", "принадлежность", "мужской род"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["du", "des", "de le", "de la", "de les", "au"],
            "label": "Choisissez l''article contracté avec de"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Les cahiers [ARTICLE] étudiants",
            "example": "Les cahiers des étudiants",
            "context": "Множественное число - des"
          },
          {
            "id": "variation_2",
            "pattern": "La voiture [ARTICLE] voisin",
            "example": "La voiture du voisin",
            "context": "Принадлежность"
          }
        ]'::jsonb,
        'intermediate',
        'Articles',
        'Упражнение на использование слитных артиклей с предлогом de. Du (de + le) для мужского рода единственного числа, des (de + les) для множественного числа, de la для женского рода.',
        '["артикль", "слитный", "du", "des", "de + le", "de + les", "принадлежность"]'::jsonb,
        '${topicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Упражнение 6: Нулевой артикль (продвинутый уровень)
    const card6Id = 'f6000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${card6Id}',
        'Sans article - Нулевой артикль',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Упражнение на случаи использования без артикля (нулевой артикль)',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${card6Id}',
        'Il étudie [ARTICLE] français',
        'Il étudie français',
        '[
          {
            "id": "blank_1",
            "position": 11,
            "correctAnswer": "",
            "hints": ["нулевой артикль", "языки без артикля", "изучение языков", "без артикля перед названиями языков"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["", "le", "la", "les", "du", "de la"],
            "label": "Choisissez: article ou sans article?"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Elle parle [ARTICLE] anglais",
            "example": "Elle parle anglais",
            "context": "Названия языков без артикля"
          },
          {
            "id": "variation_2",
            "pattern": "Il aime [ARTICLE] chocolat",
            "example": "Il aime le chocolat",
            "context": "Но с определенным артиклем для конкретного предмета"
          }
        ]'::jsonb,
        'advanced',
        'Articles',
        'Упражнение на случаи использования нулевого артикля. Названия языков обычно без артикля (français, anglais), но с определенным артиклем для конкретных предметов (le chocolat, le pain).',
        '["артикль", "нулевой", "без артикля", "языки", "исключения"]'::jsonb,
        '${topicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Упражнение 7: Комплексный выбор с учетом контекста (продвинутый уровень)
    const card7Id = 'f7000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${card7Id}',
        'Choix complexe - Комплексный выбор артиклей',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Комплексное упражнение на выбор артикля с учетом рода, числа и контекста',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${card7Id}',
        'Je vais [ARTICLE] supermarché pour acheter [ARTICLE] lait et [ARTICLE] pommes',
        'Je vais au supermarché pour acheter du lait et des pommes',
        '[
          {
            "id": "blank_1",
            "position": 8,
            "correctAnswer": "au",
            "hints": ["направление", "à + le = au", "мужской род"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["au", "aux", "à le", "du"],
            "label": "Article avec à"
          },
          {
            "id": "blank_2",
            "position": 40,
            "correctAnswer": "du",
            "hints": ["частичный артикль", "неисчисляемое", "мужской род", "de + le = du"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["du", "de la", "des", "le", "un"],
            "label": "Article partitif"
          },
          {
            "id": "blank_3",
            "position": 48,
            "correctAnswer": "des",
            "hints": ["множественное число", "неопределенный артикль", "des pommes"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["des", "les", "de la", "du", "aux"],
            "label": "Article pluriel"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Nous partons [ARTICLE] France avec [ARTICLE] amis",
            "example": "Nous partons en France avec des amis",
            "context": "Путешествие с друзьями"
          },
          {
            "id": "variation_2",
            "pattern": "Elle rentre [ARTICLE] maison et prépare [ARTICLE] dîner",
            "example": "Elle rentre à la maison et prépare le dîner",
            "context": "Возвращение домой и приготовление ужина"
          }
        ]'::jsonb,
        'advanced',
        'Articles',
        'Комплексное упражнение на выбор артиклей в разных контекстах: слитные артикли (au, aux), частичные (du, de la, des), определенные (le, la, les) и неопределенные (un, une, des).',
        '["артикль", "комплексный", "слитный", "частичный", "контекст", "продвинутый"]'::jsonb,
        '${topicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM pattern_cards WHERE id IN (
        'f1000000-0000-0000-0000-000000000001',
        'f2000000-0000-0000-0000-000000000001',
        'f3000000-0000-0000-0000-000000000001',
        'f4000000-0000-0000-0000-000000000001',
        'f5000000-0000-0000-0000-000000000001',
        'f6000000-0000-0000-0000-000000000001',
        'f7000000-0000-0000-0000-000000000001'
      );
    `);
    await queryRunner.query(`
      DELETE FROM constructors WHERE id IN (
        'f1000000-0000-0000-0000-000000000001',
        'f2000000-0000-0000-0000-000000000001',
        'f3000000-0000-0000-0000-000000000001',
        'f4000000-0000-0000-0000-000000000001',
        'f5000000-0000-0000-0000-000000000001',
        'f6000000-0000-0000-0000-000000000001',
        'f7000000-0000-0000-0000-000000000001'
      );
    `);
  }
}
