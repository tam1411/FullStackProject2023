/** @module Seeds/IPHistory */

import {faker} from "@faker-js/faker";
import {Seeder} from "../../lib/seed_manager";
import {Course} from "../models/course";
import {User} from "../models/user";
import {FastifyInstance} from "fastify";
import {Review} from "../models/review";

// note here that using faker makes testing a bit...hard
// We can set a particular seed for faker, then use it later in our testing!
faker.seed(100);

/**
 * Seeds the course table
 */
export class CourseSeeder extends Seeder {

	/**
     * Runs the Course table's seed
     * @function
     * @param {FastifyInstance} app
     * @returns {Promise<void>}
     */
	override async run(app: FastifyInstance) {
		app.log.info("Seeding Course...");
		// Remove everything in there currently
		await app.db.course.delete({});
		// get our users and make each a few IPs
		const users = await User.find();
		const reviews = await Review.find();

		for (let i = 0; i < users.length; i++) {
			let course = new Course();
			course.user = users[i];
			course.Course_ID = faker.internet.ip();
			course.Name = "Course 10 " + i;
			const eachResult = await course.save();
			app.log.info("Finished seeding course user: " + i);
		}



	}
}

export const CourseSeed = new CourseSeeder();


