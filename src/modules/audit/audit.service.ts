import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuditEntity } from "src/entities/audit.entity";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuditService {
  constructor(@InjectRepository(AuditEntity) private auditRepository: Repository<AuditEntity>) { }

  async getAllAudits(): Promise<AuditEntity[]> {
    const audits = this.auditRepository.find();
    return audits;
  }

  clearUsers() {
    this.auditRepository.clear();
  }
}