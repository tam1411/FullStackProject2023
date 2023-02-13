import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	Relation,
	UpdateDateColumn
} from "typeorm";

// @ts-ignore
import {IPHistory} from "./ip_history.ts";

@Entity({name: "users"})
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

	@OneToMany((type) => IPHistory, (ip: IPHistory) => ip.user)
	ips: Relation<IPHistory[]>;

	@CreateDateColumn()
	created_at: string;

	@UpdateDateColumn()
	updated_at: string;
}
