import {faker} from "@faker-js/faker";
import {Seeder} from "../../lib/seed_manager";
import {IPHistory} from "../models/ip_history";
import User from "../models/user";
import {FastifyBaseLogger} from "fastify";

class IPHistorySeeder extends Seeder {

	override async run(log: FastifyBaseLogger) {
		log.info("Seeding IP Histories...");
		// get our users and make each a few IPs
		const users = await User.find();

		for (let i = 0; i < users.length; i++) {
			let ip = new IPHistory();
			ip.user = users[i];

			ip.ip = faker.internet.ip();
			const eachResult = await ip.save();
			ip.ip = faker.internet.ip();
			const secondResult = await ip.save();
			log.info("Finished seeding IP history pair for user: " + i);
		}
	}
}

// generate default instance for convenience
const IPHistorySeed = new IPHistorySeeder();
export default IPHistorySeed;
