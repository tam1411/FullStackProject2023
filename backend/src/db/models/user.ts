/** @module Models/User */
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity, JoinTable, ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	Relation,
	UpdateDateColumn
} from "typeorm";

//@ts-ignore
import {IPHistory} from "./ip_history.ts";
//@ts-ignore
import {Course} from "./course.ts";
//@ts-ignore
import {Review} from "./review.ts";

/**
 *  Class representing user table
 */
@Entity({name: "users"})
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 100,
		type: "varchar"
	})
	name: string;

	@Column('text')
	email: string;

	@OneToMany((type) => IPHistory, (ip: IPHistory) => ip.user)
	ips: Relation<IPHistory[]>;

	//One user can take multiples courses.
	@OneToMany((type) => Course, (course: Course) => course.user)
	courses: Relation<Course[]>;

	//For bad words update
	@Column({
		default: 0
	})
	badwords!: number;

	// Me when like review of other users
	@OneToMany((type) => Review, (review:Review) => review.whoIlike)
	liking: Relation<Review[]>;

	// Users who likes my review
	@OneToMany((type) => Review, (review:Review) => review.wholikeme)
	liked: Relation<Review[]>;


	@CreateDateColumn()
	created_at: string;

	@UpdateDateColumn()
	updated_at: string;
}
