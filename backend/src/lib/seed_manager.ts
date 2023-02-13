import {FastifyBaseLogger} from "fastify";

export type SeederOptions = {
	seeds: Array<Seeder>;
}

export class Seeder {
	async run(log: FastifyBaseLogger) {
	}
}

class SeedMgr {
	async seedAll(log: FastifyBaseLogger, options: SeederOptions) {
		for (let i = 0; i < options.seeds.length; i++) {
			await options.seeds[i].run(log);
		}
	}
}

const SeedManager = new SeedMgr();
export default SeedManager;
