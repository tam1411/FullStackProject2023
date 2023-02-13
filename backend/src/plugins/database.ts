// src/plugins/db.ts
import "reflect-metadata";
import fp from "fastify-plugin";
import {DataSource, Repository} from "typeorm";
import User from "../db/models/user";
import {IPHistory} from "../db/models/ip_history";
import {FastifyInstance, FastifyPluginOptions} from "fastify";
import {AppDataSource} from "../../postgres_datasource";

// This is AWESOME - we're telling typescript we're adding our own "thing" to base 'app', so we get FULL IDE/TS support
declare module 'fastify' {

	interface FastifyInstance {
		db: DBConfigOpts
	}

	// interface FastifyRequest {
	// 	myPluginProp: string
	// }
	// interface FastifyReply {
	// 	myPluginProp: number
	// }
}

interface DBConfigOpts {
	user: Repository<User>,
	ip: Repository<IPHistory>,
	connection: DataSource,
}

const DbPlugin = fp(async (app: FastifyInstance, options: FastifyPluginOptions, done: any) => {

	const dataSourceConnection = AppDataSource;

	await dataSourceConnection.initialize();
	let results = await dataSourceConnection.getRepository(User).find();
	if (results.length <= 0) {
		app.log.warn("Database has no users, possibly indicating we forgot to seed");
	}

	// this object will be accessible from any fastify server instance
	// app.status(200).send()
	// app.db.user
	app.decorate("db", {
		connection: dataSourceConnection,
		user: dataSourceConnection.getRepository(User),
		ip: dataSourceConnection.getRepository(IPHistory)
	});

	done();
}, {
	name: "database-plugin"
});

export default DbPlugin;
