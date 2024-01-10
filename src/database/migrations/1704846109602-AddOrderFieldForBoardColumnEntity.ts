import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderFieldForBoardColumnEntity1704846109602 implements MigrationInterface {
    name = 'AddOrderFieldForBoardColumnEntity1704846109602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boardColumn" ADD "order" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boardColumn" DROP COLUMN "order"`);
    }

}
