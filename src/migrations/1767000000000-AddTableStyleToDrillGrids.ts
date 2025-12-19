import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableStyleToDrillGrids1767000000000 implements MigrationInterface {
    name = 'AddTableStyleToDrillGrids1767000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drill_grids" ADD "tableStyle" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drill_grids" DROP COLUMN "tableStyle"`);
    }

}

