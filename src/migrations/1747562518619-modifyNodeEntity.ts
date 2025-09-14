import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyNodeEntity1747562518619 implements MigrationInterface {
    name = 'ModifyNodeEntity1747562518619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mindmap_node" ADD "x" double precision`);
        await queryRunner.query(`ALTER TABLE "mindmap_node" ADD "y" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mindmap_node" DROP COLUMN "y"`);
        await queryRunner.query(`ALTER TABLE "mindmap_node" DROP COLUMN "x"`);
    }

}
