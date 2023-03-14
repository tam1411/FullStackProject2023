/** @module Seeds/IPHistory */
// @ts-ignore

import {faker} from "@faker-js/faker";
import {Seeder} from "../../lib/seed_manager";
import {Course} from "../models/course";
import {Review, ReviewBuilder} from "../models/review";
import {FastifyInstance} from "fastify";
import {User} from "../models/user";

// note here that using faker makes testing a bit...hard
// We can set a particular seed for faker, then use it later in our testing!
faker.seed(100);

/**
 * Seeds the course table
 */
export class ReviewSeeder extends Seeder {

	/**
	 * Runs the Course table's seed
	 * @function
	 * @param {FastifyInstance} app
	 * @returns {Promise<void>}
	 */
	override async run(app: FastifyInstance) {
		app.log.info("Seeding Review...");
		// Remove everything in there currently
		await app.db.review.delete({});
		// get our users and make each a few IPs

		const users = await User.find();
		const courses = await Course.find();
		for (let i = 0; i < users.length; i++) {
			let reviews: Review = ReviewBuilder(users[i], users[i % 5]);
			reviews.wholikeme = users[i % 5];
			reviews.Content = "This course is great";
			reviews.course = courses[i];
			await reviews.save();
			app.log.info("Finished seeding match for review: " + i);
		}

	}
}

export const ReviewSeed = new ReviewSeeder();