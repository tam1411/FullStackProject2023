import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation} from "typeorm";
// @ts-ignore
import User from "./user.ts";

@Entity()
export class IPHistory extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column("text")
	ip: string;

	@Column("text")
	method: string;

	@ManyToOne((type) => User, (user: User) => user.ips, {
		//adding an IPHistory will also add associated User if it is new, somewhat useless in this example
		cascade: true,
		// if we delete a User, also delete their IP History
		onDelete: "CASCADE"
	})
	user: Relation<User>;

	@CreateDateColumn()
	created_at: string;
}
