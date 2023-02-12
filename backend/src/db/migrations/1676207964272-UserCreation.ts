import {MigrationInterface, QueryRunner} from "typeorm";

export class UserCreation1676207964272 implements MigrationInterface {

	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" RENAME COLUMN "name" TO "username"`,
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" RENAME COLUMN "username" TO "name"`,
		); // reverts things made in "up" method
	}

}
