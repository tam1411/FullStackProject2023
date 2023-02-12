import dotenv from "dotenv";
import {DataSource} from 'typeorm';
// https://github.com/microsoft/TypeScript/pull/52230 bug why we have to ts-ignore these
// @ts-ignore
import User from "./src/db/models/user.ts";
// @ts-ignore
import {IPHistory} from "./src/db/models/ip_history.ts";
// @ts-ignore
import {UserCreation1676207964272} from "./src/db/migrations/1676207964272-UserCreation.ts";

dotenv.config();

//npm run typeorm migration:run -- -d ./data-source-default.ts

// @ts-ignore
const env = process.env;

export const AppDataSource = new DataSource(
	{
		type: "postgres",
		host: env.VITE_DB_HOST,
		port: Number(env.VITE_DB_PORT),
		username: env.VITE_DB_USER,
		password: env.VITE_DB_PASS,
		database: env.VITE_DB_NAME,
		// entities are used to tell TypeORM which tables to create in the database
		entities: [
			User,
			IPHistory
		],
		migrations: [
			UserCreation1676207964272
		],
		synchronize: true,
	}
);
