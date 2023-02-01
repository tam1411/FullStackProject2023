import Fastify from "fastify";
// This will let us use our basic middlewares now, then transition to hooks later
import fastifyMiddie from "@fastify/middie"
import staticFiles from "@fastify/static";
import {doggr_routes} from "./routes";
import path from "path";
import {getDirName} from "./lib/helpers";

import logger from "./lib/logger";

export async function buildApp(enableLogging: boolean) {
	const app = Fastify({
		logger,
	});

	await app.register(fastifyMiddie);

	await app.register(staticFiles, {
		root: path.join(getDirName(import.meta), '../public'),
		prefix: '/public/',
	});

	await app.register(doggr_routes);

	return app;
}

// lookie, now we have top level await!
const app = await buildApp(true);

try {
	void await app.listen(
		{ host: import.meta.env["VITE_IP_ADDR"], port: Number(import.meta.env["VITE_PORT"]) },
		(err) => {
			// much nicer logging!
			if (err) {
				app.log.error(err);
			}
		});
} catch (err) {
	app.log.error(err);
}

export const doggr = app;
