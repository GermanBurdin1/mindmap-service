import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMindmap1747559623038 implements MigrationInterface {
    name = 'InitMindmap1747559623038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mindmap_node" ("id" uuid NOT NULL, "title" character varying NOT NULL, "parentId" uuid, "position" jsonb, "side" character varying, "expanded" boolean NOT NULL DEFAULT true, "rule" text, "exception" text, "example" text, CONSTRAINT "PK_546f2e05aecf45f2e6d96ad12df" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "mindmap_node"`);
    }

}
