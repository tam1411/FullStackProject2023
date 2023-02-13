import User from "../models/user";
import {faker} from "@faker-js/faker";
import {Seeder} from "../../lib/seed_manager";
import {FastifyBaseLogger} from "fastify";

class UserSeeder extends Seeder {

	override async run(log: FastifyBaseLogger) {

		log.info("Seeding Users...");
		for (let i = 0; i < 10; i++) {
			let user = new User();
			user.name = faker.name.fullName();
			user.email = faker.internet.email();
			await user.save();
			log.info("Seeded user " + i);
		}
	}
}

// generate default instance for convenience
const UserSeed = new UserSeeder();
export default UserSeed;
