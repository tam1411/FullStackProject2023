import { MigrationInterface, QueryRunner } from "typeorm";

export class updateReview1678826108556 implements MigrationInterface {
    name = 'updateReview1678826108556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_87b9d728da07177bab455a39582"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "UQ_87b9d728da07177bab455a39582"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "reviewId"`);
        await queryRunner.query(`ALTER TABLE "review" ADD "courseId" integer`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "UQ_a5db1fc5911a8cbe6d7570ea50c" UNIQUE ("courseId")`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_a5db1fc5911a8cbe6d7570ea50c" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_a5db1fc5911a8cbe6d7570ea50c"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "UQ_a5db1fc5911a8cbe6d7570ea50c"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "courseId"`);
        await queryRunner.query(`ALTER TABLE "course" ADD "reviewId" integer`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "UQ_87b9d728da07177bab455a39582" UNIQUE ("reviewId")`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_87b9d728da07177bab455a39582" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
