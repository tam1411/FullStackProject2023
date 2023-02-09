import cors from "cors";
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import User from "./db/models/user";
import {IPHistory} from "./db/models/ip_history";

// This is the fn we pass to app.register() in order to configure all of our routes
export async function doggr_routes(app: FastifyInstance) {

	// Middleware
	// TODO: Refactor this in favor of fastify-cors
	app.use(cors());

	// Endpoint routes
	app.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
		console.log("Getting index");
		reply.send("GET Index");
	});

// CRUD impl for users
// Create new user

	app.post("/users", async (req, res) => {
		const user = new User();
		user.name = "Casey Jones";
		user.email = "email@gmail.com";

		const ip = new IPHistory();
		ip.ip = "127.0.0.1";
		ip.user = user;
		await ip.save();

		return res.status(200).send(ip);
	});
}
