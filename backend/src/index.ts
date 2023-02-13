// noinspection JSUnusedGlobalSymbols

import "reflect-metadata";
import {buildApp, listen} from "./server";
import SeedManager from "./lib/seed_manager";
import SeederOptions from "./db/seeds/seeder_options";

const app = await buildApp(true, true);

// Add some DIY seeding to doggr!
if (process.argv[2] === "-seed") {
	// Run seed
	try {
		app.log.info("Starting seed");

		await SeedManager.seedAll(app, SeederOptions);

		app.log.info("Seeding done, cleaning up after ourselves...");


	} catch (err) {
		app.log.error("Error seeding database" + err);
	}

} else {
	// Make our new app start listening, but NOT our tests, because our tests won't call listen!
	void await listen(app);
}

// boilerplate - doggr here matches with vite.config.js::exportName
export const doggr = app;
