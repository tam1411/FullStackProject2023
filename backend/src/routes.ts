import fs from "fs/promises";
import path from "path";
import cors from "cors";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getDirName } from "./lib/helpers";

import { usersData } from "./lib/mockData";

function areWeTestingWithJest() {
	return process.env['JEST_WORKER_ID'] !== undefined;
}

let __dirname = getDirName(import.meta);

const filePathPrefix = areWeTestingWithJest()
	// Jest
	? path.resolve(__dirname, "..", "public")
	// Not Jest
	: path.resolve(__dirname, "public");

// Reminder of what we used to have to do
// async function getStaticFile(res, filePath) {
//     return fs.readFile(
//       path.resolve(filePathPrefix, filePath), "utf8")
//       .catch((err) => {
//           return res.status(500).send(`Server Error Occurred! ${err}`);
//       }).then((file) => {
//           res.status(200).send(file);
//       });
// }

export async function doggr_routes(app: FastifyInstance) {
	// Add CORS middleware
	// TODO: Refactor this in favor of fastify-cors
	app.use(cors());

	// READ THIS LINK FOR EASY TO MISS SNAGS
	// https://www.fastify.io/docs/latest/Reference/Routes/#async-await
	// SERIOUSLY, REALLY READ IT
	app.get("/about", async (req: FastifyRequest, res: FastifyReply) => {
		return "about:GET";
	});

	// Directly returns index.html file
	app.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
		return reply.status(200).sendFile("index.html");
	});

	// This expects a POST request with JSON payload like: const payload = { newUser: "tom" };
	app.post("/users", async function createUser(request: FastifyRequest, reply: FastifyReply) {
		const newUser = request.body;

		if (!newUser) {
			// Fastify handles errors for us nicely!
			throw new Error("Error creating user");
		}

		reply.status(201).send(newUser);
	});

	// Note that Fastify doesn't require you to res.send() or res.json() or res.end() or anything like that
	// It's all handled for you!
	// https://www.fastify.io/docs/latest/Reply/
	// https://www.fastify.io/docs/latest/Reply/#send
	app.get("/usersData", async () => {
		return usersData;
	});

	//https://www.fastify.io/docs/latest/Reference/TypeScript/#using-generics
	interface UserIDQueryParams {
		userID: string;
	}

	//https://www.fastify.io/docs/latest/Reference/Request/
	app.get<{ Params: UserIDQueryParams }>("/users/:userID", async (request, reply) => {
		const { userID } = request.params;
		const user = {
			// also valid
			//foo: request.params['userID']
			//foo: request.params.userID
			userID,
			first_name: "Bobinsky",
			last_name: "Oso",
		};

		return user;
	})

	// This replaces our old app.use("*") catchall route
	app.setNotFoundHandler(defaultRoute);
}

const defaultRoute = async (req: FastifyRequest, res: FastifyReply) => {
	return res.status(404).send({
		message: "This page doesn't exist!",
	});
};
