import {MigrationInterface, QueryRunner} from "typeorm";

export class IpHistoryAddMethod1676209284860 implements MigrationInterface {
	name = 'IpHistoryAddMethod1676209284860';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "username" TO "name"`);
		await queryRunner.query(`ALTER TABLE "ip_history"
        ADD "method" text NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "ip_history" DROP COLUMN "method"`);
		await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "username"`);
	}

}
