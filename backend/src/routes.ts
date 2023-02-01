import cors from "cors";
import fs from "fs/promises";
import path from "path";
import {getDirName} from "./lib/helpers";
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {FastifyRequestType} from "fastify/types/type-provider";

function areWeTestingWithJest() {
	return process.env['JEST_WORKER_ID'] !== undefined;
}

let __dirname = getDirName(import.meta);

const filePathPrefix = areWeTestingWithJest()
	// Jest
	? path.resolve(__dirname, "..", "public")
	// Not Jest
	: path.resolve(__dirname, "public");

// async function getStaticFileOld(res, filePath) {
//     return fs.readFile(
//       path.resolve(filePathPrefix, filePath), "utf8")
//       .catch((err) => {
//           return res.status(500).send(`Server Error Occurred! ${err}`);
//       }).then((file) => {
//           res.status(200).send(file);
//       });
// }

async function getStaticFile(reply: FastifyReply, filePath: string) {
	return fs.readFile(path.resolve(filePathPrefix, filePath), "utf8");
}


export async function setupRoutes(app: FastifyInstance) {

	app.use(cors());

	//READ THIS LINK FOR EASY TO MISS SNAGS
	//https://www.fastify.io/docs/latest/Reference/Routes/#async-await
	app.get("/about", async (req: FastifyRequest, res: FastifyReply) => {
		return "about:GET";
	});

	app.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
		return getStaticFile(reply, "index.html");
	});

	app.post("/users", async function createUser(request: FastifyRequest, reply: FastifyReply) {
		const newUser = request.body;

		if (!newUser) {
			throw new Error("Error creating user");
		}

		reply.status(201).send(newUser);
	});

	//https://www.fastify.io/docs/latest/Reference/TypeScript/#using-generics
	interface UserIDQueryParams {
		userID: string;
	}

	//https://www.fastify.io/docs/latest/Reference/Request/
	app.get<{ Params: UserIDQueryParams }>("/users/:userID", async (request, reply) => {
		const {userID} = request.params;
		const user = {
			//foo: userID
			//foo: request.params.userID
			foo: request.params['userID'],
			first_name: "Bobinsky",
			last_name: "Oso",
		};

		return user;
	})

	app.setNotFoundHandler(defaultRoute);
}

const defaultRoute = async (req: FastifyRequest, res: FastifyReply) => {
	return res.status(404).send({
		message: "This page doesn't exist!",
	});
};
