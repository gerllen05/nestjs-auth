import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  method: string;

  @Column({ nullable: true })
  code: number;

  // @ManyToOne(() => UserEntity, (user) => user.audits, { nullable: true })
  // userId: number

  constructor(item: Partial<AuditEntity>) {
    Object.assign(this, item);
  }
}