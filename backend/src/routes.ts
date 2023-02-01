import cors from "cors";
import fs from "fs/promises";
import path from "path";
import {getDirName} from "./lib/helpers";

function areWeTestingWithJest() {
	return process.env.JEST_WORKER_ID !== undefined;
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

async function getStaticFile(res, filePath) {
	return fs.readFile(path.resolve(filePathPrefix, filePath), "utf8");
}

export async function setupRoutes(app) {

	app.use(cors());

	//READ THIS LINK FOR EASY TO MISS SNAGS
	//https://www.fastify.io/docs/latest/Reference/Routes/#async-await
	app.get("/about", async (req, res) => {
		return "about:GET";
	});

	app.get("/", async (request, reply) => {
		return getStaticFile(reply, "index.html");
	});

	app.post("/users", async function createUser(request, reply) {
      const newUser = request.body;

      if (!newUser) {
          throw new Error("Error creating user");
      }

      reply.status(201).send(newUser);
	});

  app.get("/users/:userID", async (req, reply) => {
      const user = {
          id: req.params.user_id,
          first_name: "Bobinsky",
          last_name: "Oso",
      };

      return user;
  })

	app.setNotFoundHandler(defaultRoute);
}

const defaultRoute = async (req, res) => {
	return res.status(404).send({
		message: "This page doesn't exist!",
	});
};
