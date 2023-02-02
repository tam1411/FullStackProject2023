// This will let us use our basic middlewares now, then transition to hooks later
import fastifyMiddie from "@fastify/middie";
import staticFiles from "@fastify/static";
import Fastify from "fastify";
import path from "path";
import {getDirName} from "./lib/helpers";
import logger from "./lib/logger";
import {doggr_routes} from "./routes";

export async function buildApp(useLogging: boolean = true) {
	// enables fancy logs and disabling them during tests
	const app = useLogging ?
		Fastify({
			logger,
		})
		: Fastify({logger: false});

	// add express-like 'app.use' middleware support
	await app.register(fastifyMiddie);

	// add static file handling
	await app.register(staticFiles, {
		root: path.join(getDirName(import.meta), "../public"),
		prefix: "/public/",
	});

	// Adds all of our Router's routes to the app
	await app.register(doggr_routes);

	return app;
}

// lookie, now we have top level await!
const app = await buildApp();

try {
	void await app.listen({ // Config object is optional and defaults to { host: 'localhost', port: 3000 }
		host: import.meta.env["VITE_IP_ADDR"],
		port: Number(import.meta.env["VITE_PORT"]),
	}, (err) => {  // Listen handler doesn't need to do much except report errors!
		if (err) {
			app.log.error(err);
		}
	});
} catch (err) { // This will catch any errors that further bubble up from listen(), should be unnecessary
	app.log.error(err);
}

// doggr here matches with vite.config.js::exportName
export const doggr = app;
