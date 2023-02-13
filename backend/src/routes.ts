import cors from "cors";
import {FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import User from "./db/models/user";
import {IPHistory} from "./db/models/ip_history";


/**
 * This is the fn we pass to app.register() in order to configure all of our routes
 *
 * @param app Our main fastify Instance
 *
 * @return  Promise<void> upon completion of routes registration
 */
export async function doggr_routes(app: FastifyInstance) {

	// Middleware
	// TODO: Refactor this in favor of fastify-cors
	app.use(cors());

	// Endpoint routes
	// Test route to test-testing
	app.get("/test", async (request: FastifyRequest, reply: FastifyReply) => {
		reply.send("GET Test");
	});

	// Get all users
	app.get("/users", async (req, reply) => {
		let users = await app.db.user.find();
		reply.send(users);
	});

	// CRUD impl for users
	// Create new user

	// Appease fastify gods
	const post_users_opts: RouteShorthandOptions = {
		schema: {
			body: {
				type: 'object',
				properties: {
					name: {type: 'string'},
					email: {type: 'string'}
				}
			},
			response: {
				200: {
					type: 'object',
					properties: {
						user: {type: 'object'},
						ip_address: {type: 'string'}
					}
				}
			}
		}
	};

	// Appease typescript request gods
	interface IPostUsersBody {
		name: string,
		email: string,
	}

	// Appease typescript response gods
	interface IPostUsersResponse {
		user: User,
		ip_address: string
	}

	app.post<{
		Body: IPostUsersBody,
		Reply: IPostUsersResponse
	}>("/users", post_users_opts, async (req, reply: FastifyReply) => {

		const {name, email} = req.body;

		const user = new User();
		user.name = name;
		user.email = email;

		const ip = new IPHistory();
		ip.ip = req.ip;
		ip.user = user;
		// transactional, transitively saves user to users table as well IFF both succeed
		await ip.save();

		//manually JSON stringify due to fastify bug with validation
		// https://github.com/fastify/fastify/issues/4017
		await reply.send(JSON.stringify({user, ip_address: ip.ip}));
	});
}
