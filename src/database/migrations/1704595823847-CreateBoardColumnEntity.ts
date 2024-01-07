import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBoardColumnEntity1704595823847 implements MigrationInterface {
    name = 'CreateBoardColumnEntity1704595823847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "boardColumn" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "boardId" uuid, CONSTRAINT "PK_ce96265cb4ce2aa299381769eeb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "boardColumn" ADD CONSTRAINT "FK_0574f8fabfe2295030c26d01c37" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boardColumn" DROP CONSTRAINT "FK_0574f8fabfe2295030c26d01c37"`);
        await queryRunner.query(`DROP TABLE "boardColumn"`);
    }

}
