import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateGrammarPatternCardToChoice1772000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const constructorId = 'e0000000-0000-0000-0000-000000000001';

    // Обновляем существующую pattern-card для использования типа choice
    await queryRunner.query(`
      UPDATE pattern_cards
      SET 
        pattern = 'Je voudrais [ARTICLE] livre',
        example = 'Je voudrais le livre',
        blanks = '[
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
        ]'::jsonb
      WHERE id = '${constructorId}';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const constructorId = 'e0000000-0000-0000-0000-000000000001';

    // Возвращаем к старому формату
    await queryRunner.query(`
      UPDATE pattern_cards
      SET 
        pattern = 'Je voudrais [ARTICLE] [NOUN]',
        example = 'Je voudrais le livre',
        blanks = '[
          {
            "id": "blank_1",
            "position": 12,
            "correctAnswer": "le",
            "hints": ["артикль мужского рода", "определенный артикль"],
            "alternatives": ["la"],
            "partOfSpeech": "ARTICLE"
          },
          {
            "id": "blank_2",
            "position": 15,
            "correctAnswer": "livre",
            "hints": ["существительное", "мужской род"],
            "alternatives": ["cahier", "stylo", "crayon"],
            "partOfSpeech": "NOUN"
          }
        ]'::jsonb
      WHERE id = '${constructorId}';
    `);
  }
}
