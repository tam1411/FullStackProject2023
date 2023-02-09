import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import {IPHistory} from "./ip_history";

@Entity()
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 100,
		type: "varchar"
	})
	name: string;

	@Column('text')
	email: string;

	@OneToMany((type) => IPHistory, (ip) => ip.user)
	ips: IPHistory[];

	@CreateDateColumn()
	created_at: string;

	@UpdateDateColumn()
	updated_at: string;
}

// let fooUser = new User();
// fooUser.name fooUser.email
