import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationUserReview1678744662473 implements MigrationInterface {
    name = 'UpdateRelationUserReview1678744662473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" ADD "whoIlikeId" integer`);
        await queryRunner.query(`ALTER TABLE "review" ADD "wholikemeId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "badwords" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_c07c6af0b1d1de10c67b5cb20e5" FOREIGN KEY ("whoIlikeId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_86e43fe02b56ba074dbd442759e" FOREIGN KEY ("wholikemeId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_86e43fe02b56ba074dbd442759e"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_c07c6af0b1d1de10c67b5cb20e5"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "badwords"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "wholikemeId"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "whoIlikeId"`);
    }

}
