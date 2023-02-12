import { DataSource } from 'typeorm';
import User from "./src/db/models/user";
import {IPHistory} from "./src/db/models/ip_history";
//npm run typeorm migration:run -- -d ./data-source-default.ts

// @ts-ignore
const env: ImportMetaEnv = import.meta.env;

const PostgresDatasource =   new DataSource(
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
		migrations: [
			"src/db/migrations/*.ts"
		],
		synchronize: true,
	}
);

export { PostgresDatasource };
