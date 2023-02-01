import * as dotenv from "dotenv";

dotenv.config();

import cors from "cors";

import fs from "fs/promises";
import path from "path";
//import {Nastify} from "./nastify";
import Fastify from "fastify";
import fastifyMiddie from "@fastify/middie"

const app = Fastify();
// lookie, now we have top level await!
await app.register(fastifyMiddie);

console.log(app);

app.use("/about", cors());
app.use("/get", cors());

app.get("/about", (req, res) => {
	res.send("I am the about page");
});

app.post("/about", (req, res) => {
	res.send("I am POST REQUEST");
})

app.get("/users", (req, res) => {

})

app.get("/", async (req, res) => {

	const indexFile = await fs.readFile(path.resolve(__dirname, 'public', 'index.html'))
		.catch(err => {
			console.error(err);
			//send error result - 500!
			res.header('Content-Type', 'text/html');
			res.status(500).send("Error occurred");
		});

	res.status(200).send(indexFile);
});

app.get('/get', async (req, res) => {
	const indexFile = await fs.readFile(path.resolve(__dirname, 'public', 'index.html'))
		.catch(err => {
			console.error(err);
			//send error result - 500!
			res.header('Content-Type', 'text/html');
			return res.status(500).send("Error occurred");

		});

	return res.status(200).send(indexFile);
});


void await app.listen(8080, () => {
	console.log("Server is running");
});

