import { Role } from "src/enums/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.User,
  })
  roles: Role[];

  constructor(item: Partial<UserEntity>) {
    Object.assign(this, item);
  }
}
