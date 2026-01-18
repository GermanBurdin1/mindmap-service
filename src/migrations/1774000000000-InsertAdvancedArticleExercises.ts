import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertAdvancedArticleExercises1774000000000 implements MigrationInterface {
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

    // Упражнение 1: Артикли с отрицанием (средний уровень)
    const card1Id = 'f8000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${card1Id}',
        'Pas de - Артикли с отрицанием',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Упражнение на использование артикля de после отрицания pas',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${card1Id}',
        'Je n''ai pas [ARTICLE] voiture',
        'Je n''ai pas de voiture',
        '[
          {
            "id": "blank_1",
            "position": 12,
            "correctAnswer": "de",
            "hints": ["après pas", "pas de + nom", "pas d''article défini", "после отрицания pas используется de"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["de", "du", "de la", "des", "la", "une"],
            "label": "Choisissez l''article après la négation"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Il n''a pas [ARTICLE] frères",
            "example": "Il n''a pas de frères",
            "context": "Отрицание с множественным числом"
          },
          {
            "id": "variation_2",
            "pattern": "Nous n''avons pas [ARTICLE] temps",
            "example": "Nous n''avons pas de temps",
            "context": "Отрицание с неисчисляемыми существительными"
          }
        ]'::jsonb,
        'intermediate',
        'Articles',
        'После отрицания "pas" используется "de" вместо определенных и неопределенных артиклей. Je n''ai pas de voiture (не "pas une voiture" или "pas la voiture").',
        '["артикль", "отрицание", "pas de", "négation"]'::jsonb,
        '${negationTopicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Упражнение 2: Артикли с выражениями количества (средний уровень)
    const card2Id = 'f9000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${card2Id}',
        'Beaucoup de - Артикли с выражениями количества',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Упражнение на использование de после выражений количества',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${card2Id}',
        'Il mange beaucoup [ARTICLE] chocolat',
        'Il mange beaucoup de chocolat',
        '[
          {
            "id": "blank_1",
            "position": 18,
            "correctAnswer": "de",
            "hints": ["après beaucoup", "beaucoup de + nom", "expressions de quantité", "после beaucoup используется de"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["de", "du", "de la", "le", "un"],
            "label": "Choisissez l''article après beaucoup"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Elle boit peu [ARTICLE] café",
            "example": "Elle boit peu de café",
            "context": "Peu de - мало"
          },
          {
            "id": "variation_2",
            "pattern": "Nous avons assez [ARTICLE] pain",
            "example": "Nous avons assez de pain",
            "context": "Assez de - достаточно"
          }
        ]'::jsonb,
        'intermediate',
        'Articles',
        'После выражений количества (beaucoup, peu, assez, trop, plus, moins) используется "de". Beaucoup de chocolat, peu de café, assez de pain.',
        '["артикль", "количество", "beaucoup de", "peu de", "assez de"]'::jsonb,
        '${quantifiersTopicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Упражнение 3: Артикли после глаголов (средний-продвинутый уровень)
    const card3Id = 'fa000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${card3Id}',
        'Avoir besoin de - Артикли после глаголов',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Упражнение на использование артиклей после глагольных конструкций',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${card3Id}',
        'J''ai besoin [ARTICLE] aide',
        'J''ai besoin de l''aide',
        '[
          {
            "id": "blank_1",
            "position": 13,
            "correctAnswer": "de l''",
            "hints": ["avoir besoin de", "aide commence par voyelle", "de + l''", "перед гласной используется de l''"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["de l''", "de la", "du", "de", "la"],
            "label": "Choisissez l''article après avoir besoin"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Il a envie [ARTICLE] glace",
            "example": "Il a envie de la glace",
            "context": "Avoir envie de - хотеть"
          },
          {
            "id": "variation_2",
            "pattern": "Elle a peur [ARTICLE] chiens",
            "example": "Elle a peur des chiens",
            "context": "Avoir peur de - бояться"
          }
        ]'::jsonb,
        'intermediate',
        'Articles',
        'После глагольных конструкций (avoir besoin de, avoir envie de, avoir peur de) используются артикли: de l'' перед гласной, de la для женского рода, du для мужского, des для множественного числа.',
        '["артикль", "глаголы", "avoir besoin de", "avoir envie de", "de l''", "de la", "du"]'::jsonb,
        '${verbsTopicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Упражнение 4: Вопросительные артикли (средний уровень)
    const card4Id = 'fb000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${card4Id}',
        'Quel/Quelle - Вопросительные артикли',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Упражнение на выбор вопросительного артикля в зависимости от рода и числа',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${card4Id}',
        '[ARTICLE] livre préférez-vous?',
        'Quel livre préférez-vous?',
        '[
          {
            "id": "blank_1",
            "position": 0,
            "correctAnswer": "Quel",
            "hints": ["masculin singulier", "livre est masculin", "Quel pour masculin", "вопросительный артикль для мужского рода"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["Quel", "Quelle", "Quels", "Quelles", "Lequel"],
            "label": "Choisissez l''article interrogatif"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "[ARTICLE] voiture aimez-vous?",
            "example": "Quelle voiture aimez-vous?",
            "context": "Quelle для женского рода"
          },
          {
            "id": "variation_2",
            "pattern": "[ARTICLE] livres lisez-vous?",
            "example": "Quels livres lisez-vous?",
            "context": "Quels для множественного числа мужского рода"
          }
        ]'::jsonb,
        'intermediate',
        'Articles',
        'Вопросительные артикли согласуются с родом и числом существительного: Quel (мужской род единственное число), Quelle (женский род единственное число), Quels (мужской род множественное число), Quelles (женский род множественное число).',
        '["артикль", "вопрос", "Quel", "Quelle", "Quels", "Quelles", "interrogatif"]'::jsonb,
        '${questionsTopicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Упражнение 5: Притяжательные артикли (начальный-средний уровень)
    const card5Id = 'fc000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${card5Id}',
        'Mon/Ma/Mes - Притяжательные артикли',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Упражнение на согласование притяжательных артиклей с родом и числом',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${card5Id}',
        'C''est [ARTICLE] voiture',
        'C''est ma voiture',
        '[
          {
            "id": "blank_1",
            "position": 6,
            "correctAnswer": "ma",
            "hints": ["féminin singulier", "voiture est féminin", "ma pour féminin", "притяжательный артикль для женского рода"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["ma", "mon", "mes", "ta", "ton", "tes"],
            "label": "Choisissez l''article possessif"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "C''est [ARTICLE] livre",
            "example": "C''est mon livre",
            "context": "Mon для мужского рода"
          },
          {
            "id": "variation_2",
            "pattern": "Ce sont [ARTICLE] amis",
            "example": "Ce sont mes amis",
            "context": "Mes для множественного числа"
          }
        ]'::jsonb,
        'beginner',
        'Articles',
        'Притяжательные артикли согласуются с родом и числом существительного, а не с владельцем. Ma voiture (моя машина - женский род), mon livre (моя книга - мужской род), mes amis (мои друзья - множественное число).',
        '["артикль", "притяжательный", "mon", "ma", "mes", "ton", "ta", "tes"]'::jsonb,
        '${possessiveTopicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Упражнение 6: Артикли с географическими названиями (средний уровень)
    const card6Id = 'fd000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${card6Id}',
        'En/Au/Aux - Артикли с географическими названиями',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Упражнение на использование предлогов и артиклей с названиями стран и городов',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${card6Id}',
        'Je vais [ARTICLE] France',
        'Je vais en France',
        '[
          {
            "id": "blank_1",
            "position": 8,
            "correctAnswer": "en",
            "hints": ["pays féminin", "France est féminin", "en pour pays féminin", "en для стран женского рода"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["en", "au", "à la", "aux", "dans la"],
            "label": "Choisissez la préposition avec le pays"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Il voyage [ARTICLE] Canada",
            "example": "Il voyage au Canada",
            "context": "Au для стран мужского рода"
          },
          {
            "id": "variation_2",
            "pattern": "Nous allons [ARTICLE] États-Unis",
            "example": "Nous allons aux États-Unis",
            "context": "Aux для стран множественного числа"
          }
        ]'::jsonb,
        'intermediate',
        'Articles',
        'С географическими названиями используются разные предлоги: en для стран женского рода (en France, en Espagne), au для стран мужского рода (au Canada, au Maroc), aux для стран множественного числа (aux États-Unis, aux Pays-Bas).',
        '["артикль", "география", "en", "au", "aux", "страны", "prépositions"]'::jsonb,
        '${geographyTopicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Упражнение 7: Артикли с профессиями (начальный уровень)
    const card7Id = 'fe000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${card7Id}',
        'Être + profession - Нулевой артикль с профессиями',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Упражнение на отсутствие артикля при указании профессии после être',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${card7Id}',
        'Il est [ARTICLE] médecin',
        'Il est médecin',
        '[
          {
            "id": "blank_1",
            "position": 7,
            "correctAnswer": "",
            "hints": ["après être", "profession", "pas d''article", "профессия после être без артикля"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["", "un", "une", "le", "la"],
            "label": "Choisissez: article ou sans article?"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Elle est [ARTICLE] professeur",
            "example": "Elle est professeur",
            "context": "Профессия без артикля"
          },
          {
            "id": "variation_2",
            "pattern": "Ils sont [ARTICLE] ingénieurs",
            "example": "Ils sont ingénieurs",
            "context": "Множественное число тоже без артикля"
          }
        ]'::jsonb,
        'beginner',
        'Articles',
        'После глагола être при указании профессии обычно не используется артикль. Il est médecin (не "Il est un médecin"). Исключение: когда есть определение - Il est un bon médecin.',
        '["артикль", "профессия", "être", "нулевой артикль", "sans article"]'::jsonb,
        '${professionsTopicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Упражнение 8: Артикли в выражениях времени (начальный-средний уровень)
    const card8Id = 'ff000000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${card8Id}',
        'Le matin, la nuit - Артикли в выражениях времени',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Упражнение на использование артиклей в выражениях времени суток',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${card8Id}',
        'Je travaille [ARTICLE] matin',
        'Je travaille le matin',
        '[
          {
            "id": "blank_1",
            "position": 13,
            "correctAnswer": "le",
            "hints": ["moment de la journée", "le matin", "masculin", "определенный артикль для времени суток"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["le", "la", "les", "au", "du"],
            "label": "Choisissez l''article pour le moment de la journée"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Il dort [ARTICLE] nuit",
            "example": "Il dort la nuit",
            "context": "La nuit - ночь (женский род)"
          },
          {
            "id": "variation_2",
            "pattern": "Nous déjeunons [ARTICLE] midi",
            "example": "Nous déjeunons à midi",
            "context": "À midi - в полдень (без артикля)"
          }
        ]'::jsonb,
        'beginner',
        'Articles',
        'В выражениях времени суток используются определенные артикли: le matin (утром), l''après-midi (днем), le soir (вечером), la nuit (ночью). Исключение: à midi, à minuit (без артикля).',
        '["артикль", "время", "le matin", "la nuit", "le soir", "moments"]'::jsonb,
        '${timeTopicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Упражнение 9: Артикли с абстрактными понятиями (продвинутый уровень)
    const card9Id = 'f1000000-0000-0000-0000-000000000002';
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${card9Id}',
        'La liberté - Артикли с абстрактными понятиями',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Упражнение на использование артиклей с абстрактными существительными',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${card9Id}',
        '[ARTICLE] liberté est importante',
        'La liberté est importante',
        '[
          {
            "id": "blank_1",
            "position": 0,
            "correctAnswer": "La",
            "hints": ["notion abstraite", "liberté est féminin", "article défini", "абстрактное понятие с определенным артиклем"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["La", "Le", "L''", "Une", "De la"],
            "label": "Choisissez l''article pour la notion abstraite"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "[ARTICLE] amour est beau",
            "example": "L''amour est beau",
            "context": "L'' перед гласной"
          },
          {
            "id": "variation_2",
            "pattern": "[ARTICLE] justice doit prévaloir",
            "example": "La justice doit prévaloir",
            "context": "Абстрактное понятие с определенным артиклем"
          }
        ]'::jsonb,
        'advanced',
        'Articles',
        'Абстрактные понятия обычно используются с определенным артиклем: la liberté, l''amour, la justice, le bonheur. Это указывает на общее понятие, а не на конкретный случай.',
        '["артикль", "абстрактное", "liberté", "amour", "notions abstraites"]'::jsonb,
        '${abstractTopicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // Упражнение 10: Артикли в сравнительных конструкциях (продвинутый уровень)
    const card10Id = 'f1100000-0000-0000-0000-000000000001';
    await queryRunner.query(`
      INSERT INTO constructors (id, title, type, "userId", "courseId", description, "createdAt", "updatedAt")
      VALUES (
        '${card10Id}',
        'Plus...que - Артикли в сравнительных конструкциях',
        'pattern_card',
        '${teacherUserId}',
        NULL,
        'Упражнение на использование артиклей в сравнительных конструкциях',
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO pattern_cards (id, pattern, example, blanks, variations, difficulty, category, explanation, tags, "topicId")
      VALUES (
        '${card10Id}',
        'Il est plus intelligent [ARTICLE] son frère',
        'Il est plus intelligent que son frère',
        '[
          {
            "id": "blank_1",
            "position": 23,
            "correctAnswer": "que",
            "hints": ["comparaison", "plus...que", "comparatif", "que для сравнения"],
            "alternatives": [],
            "partOfSpeech": "ARTICLE",
            "type": "choice",
            "options": ["que", "de", "du", "que le", "que la"],
            "label": "Choisissez la préposition pour la comparaison"
          }
        ]'::jsonb,
        '[
          {
            "id": "variation_1",
            "pattern": "Elle est moins grande [ARTICLE] sa sœur",
            "example": "Elle est moins grande que sa sœur",
            "context": "Moins...que - менее чем"
          },
          {
            "id": "variation_2",
            "pattern": "Il est aussi rapide [ARTICLE] un cheval",
            "example": "Il est aussi rapide qu''un cheval",
            "context": "Aussi...que - так же как"
          }
        ]'::jsonb,
        'advanced',
        'Articles',
        'В сравнительных конструкциях используется "que": plus...que (более чем), moins...que (менее чем), aussi...que (так же как). После que может стоять существительное с артиклем или без, в зависимости от контекста.',
        '["артикль", "сравнение", "plus que", "moins que", "aussi que", "comparatif"]'::jsonb,
        '${comparisonTopicId}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем упражнения
    await queryRunner.query(`
      DELETE FROM pattern_cards WHERE id IN (
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
    await queryRunner.query(`
      DELETE FROM constructors WHERE id IN (
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




