import * as dotenv from "dotenv";
dotenv.config();

//import {Nastify} from "./nastify";
import Fastify from "fastify";
// This will let us use our basic middlewares now, then transition to hooks later
import fastifyMiddie from "@fastify/middie"
import {setupRoutes} from "./routes";

async function buildApp() {
	const app = Fastify({
		logger: true,
	});

	await app.register(fastifyMiddie);
	await setupRoutes(app);
	return app;
}


// lookie, now we have top level await!
const app = await buildApp();

try {
	void await app.listen({port: Number(process.env.PORT) }, () => {
		// much nicer logging!
		app.log.info("Server is running");
	});
} catch (err) {
	app.log.error(err);
}

