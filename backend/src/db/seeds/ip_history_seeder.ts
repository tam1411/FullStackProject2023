import {faker} from "@faker-js/faker";
import {Seeder} from "../../lib/seed_manager";
import {IPHistory} from "../models/ip_history";
import User from "../models/user";
import {FastifyInstance} from "fastify";

/**
 *
 */
class IPHistorySeeder extends Seeder {

	override async run(app: FastifyInstance) {
		app.log.info("Seeding IP Histories...");
		// Remove everything in there currently
		await app.db.ip.delete({});
		// get our users and make each a few IPs
		const users = await User.find();

		for (let i = 0; i < users.length; i++) {
			let ip = new IPHistory();
			ip.user = users[i];

			// note here that using faker makes testing a bit...hard
			ip.ip = faker.internet.ip();
			const eachResult = await ip.save();
			ip.ip = faker.internet.ip();
			const secondResult = await ip.save();
			app.log.info("Finished seeding IP history pair for user: " + i);
		}
	}
}

// generate default instance for convenience
const IPHistorySeed = new IPHistorySeeder();
export default IPHistorySeed;
