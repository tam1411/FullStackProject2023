import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "./user";

@Entity()
export class IPHistory extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column("text")
	ip: string;

	@ManyToOne((type) => User, (user) => user.ips, {
		//adding an IPHistory will also add associated User if it is new, somewhat useless in this example
		cascade: true,
		// if we delete a User, also delete their IP History
		onDelete: "CASCADE"
	})
	user: User;

	@CreateDateColumn()
	created_at: string;
}
