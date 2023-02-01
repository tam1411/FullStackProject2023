import * as dotenv from "dotenv";

dotenv.config();

//import {Nastify} from "./nastify";
import Fastify from "fastify";
// This will let us use our basic middlewares now, then transition to hooks later
import fastifyMiddie from "@fastify/middie"
import {setupRoutes} from "./routes";

export async function buildApp() {
	const app = Fastify({
		logger: true,
	});

	await app.register(fastifyMiddie);
	await app.register(setupRoutes);
	return app;
}


// lookie, now we have top level await!
const app = await buildApp();

try {
	void await app.listen(
		{ host: process.env['IP_ADDR'], port: Number(process.env['PORT']) },
		(err) => {
			// much nicer logging!
			if (err) {
				app.log.error(err);
			}
		});
} catch (err) {
	app.log.error(err);
}

