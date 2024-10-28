import { Role } from "src/enums/role.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuditEntity } from "./audit.entity";

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

  // @OneToMany(() => AuditEntity, (audit) => audit.userId)
  // audits: AuditEntity[];

  constructor(item: Partial<UserEntity>) {
    Object.assign(this, item);
  }
}
