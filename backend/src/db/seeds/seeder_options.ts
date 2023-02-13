/** @module SeedManager */
import {UserSeed} from "./user_seeder";
import {IPHistorySeed} from "./ip_history_seeder";



/**
 * Options bag for configuring which seeds to run during `pnpm migrate:run`
 */
const SeederOptions: any = {
	seeds: [
		UserSeed,
		IPHistorySeed
	]
};

export default SeederOptions;
