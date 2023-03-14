/** @module Models/Review */
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity, JoinColumn, ManyToOne,

	OneToOne,
	PrimaryGeneratedColumn,
	Relation
} from "typeorm";
// @ts-ignore
import {Course} from "./course.ts";
//@ts-ignore
import {User} from "./user.ts";



/**
 * Course model - holds all courses a user has attended
 */
@Entity()
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column("text")
    Content: string;
    
    @OneToOne (() => Course, (course: Course) => course.review, {cascade: true, onDelete: "CASCADE"})
    @JoinColumn()
    course:Relation<Course>;

    @ManyToOne((type) => User, (whoIlike: User) => whoIlike.liking, {cascade: ["insert"], onDelete: "CASCADE"
    })
    whoIlike!: Relation<User>;

    @ManyToOne((type) => User, (wholikeme: User) => wholikeme.liked, {cascade: ["insert"], onDelete: "CASCADE"
    })
   wholikeme!: Relation<User>;


    @CreateDateColumn()
    created_at: string;


}
export function ReviewBuilder(whoIlike: User, Wholikeme: User): Review {
	let myReview = new Review();
	myReview.whoIlike = Wholikeme;
	myReview.wholikeme = Wholikeme;
	return myReview;
}