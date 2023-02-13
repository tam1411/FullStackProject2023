import {User} from "../models/user";
import {Seeder} from "../../lib/seed_manager";
import {FastifyInstance} from "fastify";

/** @module UserSeeder */

/**
 * UserSeeder class - Model class for interacting with "users" table
 */
class UserSeeder extends Seeder {
	override async run(app: FastifyInstance) {
		app.log.info("Seeding Users...");
		// clear out whatever's already there
		// note we cannot use .clear() because postgres cascade is bugged in Typeorm
		// https://github.com/typeorm/typeorm/issues/1649
		await app.db.user.delete({});

		for (let i = 0; i < 10; i++) {
			let user = new User();
			user.name = "user" + i;
			user.email = "user" + i + "@email.com";
			await user.save();
			app.log.info("Seeded user " + i);
		}
	}
}

// generate default instance for convenience
const UserSeed = new UserSeeder();
export default UserSeed;
