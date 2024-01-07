import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCardEntity1704631055399 implements MigrationInterface {
    name = 'CreateCardEntity1704631055399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "columnId" uuid NOT NULL, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "boardColumn" DROP CONSTRAINT "FK_0574f8fabfe2295030c26d01c37"`);
        await queryRunner.query(`ALTER TABLE "boardColumn" ALTER COLUMN "boardId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_592a123bd8f9add5004b2aae1fb" FOREIGN KEY ("columnId") REFERENCES "boardColumn"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boardColumn" ADD CONSTRAINT "FK_0574f8fabfe2295030c26d01c37" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boardColumn" DROP CONSTRAINT "FK_0574f8fabfe2295030c26d01c37"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_592a123bd8f9add5004b2aae1fb"`);
        await queryRunner.query(`ALTER TABLE "boardColumn" ALTER COLUMN "boardId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "boardColumn" ADD CONSTRAINT "FK_0574f8fabfe2295030c26d01c37" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "card"`);
    }

}
