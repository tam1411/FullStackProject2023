import {FastifyInstance} from "fastify";

export type SeederOptions = {
	seeds: Array<Seeder>;
}

export class Seeder {
	async run(app: FastifyInstance) {
	}
}

class SeedMgr {
	async seedAll(app: FastifyInstance, options: SeederOptions) {
		for (let i = 0; i < options.seeds.length; i++) {
			await options.seeds[i].run(app);
		}
	}
}

const SeedManager = new SeedMgr();
export default SeedManager;
