/** @module Routes */
import cors from "cors";
import {FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {User} from "./db/models/user";
import {IPHistory} from "./db/models/ip_history";
import {Course} from "./db/models/course";
import {Review} from "./db/models/review";
import {readFileSync} from "node:fs";

/**
 * App plugin where we construct our routes
 * @param {FastifyInstance} app our main Fastify app instance
 */
export async function doggr_routes(app: FastifyInstance): Promise<void> {

	// Middleware
	// TODO: Refactor this in favor of fastify-cors
	app.use(cors());

	/**
	 * Route replying to /test path for test-testing
	 * @name get/test
	 * @function
	 */
	app.get("/test", async (request: FastifyRequest, reply: FastifyReply) => {
		reply.send("GET Test");
	});

	/**
	 * Route serving login form.
	 * @name get/users
	 * @function
	 */
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



	/**
	 * Route allowing creation of a new user.
	 * @name post/users
	 * @function
	 * @param {string} name - user's full name
	 * @param {string} email - user's email address
	 * @returns {IPostUsersResponse} user and IP Address used to create account
	 */
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

	//COURSE ROUTE
	/**
	 * Listing all the current courses
	 * @name get/courses
	 * @function
	 */

	app.get("/courses", async (req,reply) =>{
		let courses = await app.db.course.find();
		reply.send(courses);
	});

	//Get courses with a given user.
	app.get("/courses/:userid", async (req:any, reply)=>{
		const userId = req.params.userid;
		let myCourse = await app.db.course.find({
			relations: ['user'],
			where : {
				user :{
					id: userId
				}
			}
		});

		reply.send(myCourse);

	});

	app.post("/courses", async (req:any, reply: FastifyReply) =>{
		const {course_name} = req.body;

		const myUser = await app.db.user.findOneByOrFail({});
		const newCourse = new Course();


		newCourse.Name = course_name;
		newCourse.Course_ID = "CS468";
		newCourse.user = myUser;

		await newCourse.save();
		await reply.send(JSON.stringify(newCourse));
	});

	//Delete all courses related to a given user.
	app.delete("/courses", async (req:any, reply:FastifyReply)=>{
		const userId = req.body.userId;
		const myCourse =  await app.db.course.find({
			relations: ['user'],
			where :{
				user: {
					id : userId,
				}
			}
		});
		let res = await app.db.course.remove(myCourse);
		await reply.send(JSON.stringify(res));

	});

	//REVIEW ROUTE
	/**
	 * Route listing all the reviews
	 * @name get/reviews
	 *@function
	 */
	app.get("/reviews", async (req: any, reply: FastifyReply) =>{
		let reviews = await app.db.review.find ({
			relations: ['whoIlike', 'wholikeme'],

		});
		reply.send(reviews);
	});

	//Create a new review
	app.post ("/review", async (req:any, reply: FastifyReply) => {

		const myCourse = await app.db.course.findOneByOrFail({});
		const whoIlike_ID = req.body.whoIlike_ID;
		const wholikeme_ID = req.body.wholikeme_ID;

		const User1 = await app.db.user.findOneByOrFail({id: whoIlike_ID});
		const User2 = await app.db.user.findOneByOrFail({id: wholikeme_ID});


		const myReview = new Review();
		myReview.course = myCourse;
		myReview.whoIlike = User1;
		myReview.wholikeme = User2;
		myReview.Content = req.body.Content;

		// Check for bad words
		const badwordsString = readFileSync("./src/plugins/badwords.txt", {encoding: 'utf-8'});
		const badwords = badwordsString.split('\r\n');

		let badword = "";
		// https://stackoverflow.com/questions/47543879/string-includes-has-a-word-on-a-ban-list
		for (let i = 0; i <= badwords.length; i++) {
			if (myReview.Content.toLowerCase()
				.includes(badwords[i])) {
				badword = badwords[i];
				break;
			}
		}
		if (badword !== "") {
			// // Update user table, increment badwords counter
			// const user = await User.findOneByOrFail({id: senderId});
			// user.badwords++;
			// await user.save();

			await reply.status(500)
				.send({
					message: "Your review contains some inappropriate words",
				});
		} else {
			await myReview.save();
			await reply.send(JSON.stringify(myReview));
		}
	});


	//Delete all the reviews with given course_id
	app.delete("/reviews/:courseId", async(req: any, reply:FastifyReply) =>{
		const course_id = req.params.courseId;
		const myReview = await app.db.review.find({
			relations: ['course'],
			where: {
				course: {
					id: course_id
				},
			}
		});
		// const myCourse = await app.db.course.findOneByOrFail({id : course_id});
		// const myReview = await app.db.review.findOneByOrFail({id : myCourse.review.id});
		let res = await app.db.review.remove(myReview);
		await reply.send(JSON.stringify(res));


	});






}

// Appease typescript request gods
interface IPostUsersBody {
	name: string,
	email: string,
}

























/**
 * Response type for post/users
 */
export type IPostUsersResponse = {
	/**
	 * User created by request
	 */
	user: User,
	/**
	 * IP Address user used to create account
	 */
	ip_address: string
}
