import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdChamp1758987912869 implements MigrationInterface {
    name = 'AddUserIdChamp1758987912869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Сначала добавляем колонку как nullable
        await queryRunner.query(`ALTER TABLE "mindmap_node" ADD "userId" uuid`);
        
        // Устанавливаем значение по умолчанию для существующих записей
        // Можно использовать системный UUID или конкретное значение
        await queryRunner.query(`UPDATE "mindmap_node" SET "userId" = gen_random_uuid() WHERE "userId" IS NULL`);
        
        // Теперь делаем колонку NOT NULL
        await queryRunner.query(`ALTER TABLE "mindmap_node" ALTER COLUMN "userId" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mindmap_node" DROP COLUMN "userId"`);
    }

}
