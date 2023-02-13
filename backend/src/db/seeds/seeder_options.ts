import UserSeed from "./user_seeder";
import IPHistorySeed from "./ip_history_seeder";

const SeederOptions = {
	seeds: [
		UserSeed,
		IPHistorySeed
	]
};

export default SeederOptions;
