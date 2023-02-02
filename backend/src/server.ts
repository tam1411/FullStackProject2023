import Fastify from "fastify";
// This will let us use our basic middlewares now, then transition to hooks later
import fastifyMiddie from "@fastify/middie"
import staticFiles from "@fastify/static";
import {doggr_routes} from "./routes";
import path from "path";
import {getDirName} from "./lib/helpers";

import logger from "./lib/logger";

export async function buildApp(enableLogging: boolean) {
	// enables fancy logs
	const app = Fastify({
		logger,
	});

	// add express-like 'app.use' middleware support
	await app.register(fastifyMiddie);

	// add static file handling
	await app.register(staticFiles, {
		root: path.join(getDirName(import.meta), '../public'),
		prefix: '/public/',
	});

	// Adds all of our Router's routes to the app
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

// doggr here matches with vite.config.js::exportName
export const doggr = app;
