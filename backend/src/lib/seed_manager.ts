import {FastifyInstance} from "fastify";

/** @module Seeder */

export type SeederOptions = {
	seeds: Array<Seeder>;
}

export abstract class Seeder {
	// Note here we do NOT make the abstract async!  No need to force it on our users, though we *can and will* use async
	abstract run(app: FastifyInstance): Promise<void>;
}

class SeedMgr {
	async seedAll(app: FastifyInstance, options: SeederOptions) {
		// Go through every seeder included in our options (See index.ts)
		for (let i = 0; i < options.seeds.length; i++) {
			// Runs each seeder's "run" method (See db/seeds/user_seeder.ts)
			await options.seeds[i].run(app);
		}
	}
}

const SeedManager = new SeedMgr();
export default SeedManager;
