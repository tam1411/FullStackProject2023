/** @module Models/Course */
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity, JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	Relation
} from "typeorm";
// @ts-ignore
import {User} from "./user.ts";
//@ts-ignore
import {Review} from "./review.ts";

/**
 * Course model - holds all courses a user has attended
 */
@Entity()
export class Course extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column("text")
    Name: string;
    
    @Column("text")
    Course_ID: string;

    @ManyToOne((type) => User, (user: User) => user.courses ,{ cascade: true, onDelete: "CASCADE"
    })
    user: Relation<User>;
    
    
    @OneToOne(() => Review, (review: Review) => review.course)
    review: Relation<Review>;
    

    @CreateDateColumn()
    created_at: string;
}
