import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedReviewTable1678388340557 implements MigrationInterface {
    name = 'AddedReviewTable1678388340557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "Content" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "course" ADD "reviewId" integer`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "UQ_87b9d728da07177bab455a39582" UNIQUE ("reviewId")`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_87b9d728da07177bab455a39582" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_87b9d728da07177bab455a39582"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "UQ_87b9d728da07177bab455a39582"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "reviewId"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }

}
