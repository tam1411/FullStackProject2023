// @ts-nocheck
// We disable typescript checking for this file because it's a config file

// We need dotenv here because our datasources are processed from CLI in addition to vite
import dotenv from "dotenv";
dotenv.config();
import {DataSource} from 'typeorm';
// Similar reasoning as above, we need to add the file extensions to this file's imports for CLI usage
import {User} from "../models/user.ts";
import {IPHistory} from "../models/ip_history.ts";
import {Initialize1676281754950} from "../migrations/1676281754950-Initialize";

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
