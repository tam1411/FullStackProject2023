import dotenv from "dotenv";
import {DataSource} from 'typeorm';
// https://github.com/microsoft/TypeScript/pull/52230 bug why we have to ts-ignore these
// @ts-ignore
import {User} from "../models/user.ts";
// @ts-ignore
import {IPHistory} from "../models/ip_history.ts";
// @ts-ignore
import {Initialize1676281754950} from "../migrations/1676281754950-Initialize";

dotenv.config();

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
			Initialize1676281754950
		],
		// DANGER DANGER our convenience will nuke production data!
		synchronize: false,
	}
);
