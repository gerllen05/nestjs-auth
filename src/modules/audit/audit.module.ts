import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuditConsumer } from "./audit.consumer";
import { AuditEntity } from "src/entities/audit.entity";
import { AuditService } from "./audit.service";
import { AuditController } from "./audit.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditEntity]),
  ],
  controllers: [AuditController],
  providers: [AuditConsumer, AuditService],
})
export class AuditModule { }