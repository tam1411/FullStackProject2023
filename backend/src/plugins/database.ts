// src/plugins/db.ts
import "reflect-metadata";
import fp from "fastify-plugin";
import {DataSource, Repository} from "typeorm";
import User from "../db/models/user";
import {IPHistory} from "../db/models/ip_history";
import {FastifyInstance, FastifyPluginOptions} from "fastify";


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
	// Note that we don't HAVE to try/catch errors, we can also let them bubble
	//try {

	const env = import.meta.env;
	const dataSourceConnection = new DataSource(
		{
			type: "postgres",
			host: env.VITE_DB_HOST,
			port: env.VITE_DB_PORT,
			username: env.VITE_DB_USER,
			password: env.VITE_DB_PASS,
			database: env.VITE_DB_NAME,
			// entities are used to tell TypeORM which tables to create in the database
			entities: [
				User,
				IPHistory
			],
			synchronize: true,
		}
	);

	await dataSourceConnection.initialize();

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
