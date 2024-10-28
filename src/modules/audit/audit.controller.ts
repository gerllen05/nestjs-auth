import { Controller, Delete, Get, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuditEntity } from "src/entities/audit.entity";
import { AuditService } from "./audit.service";

@ApiTags("audit")
@Controller(["audit"])
export class AuditController {
  constructor(private readonly auditService: AuditService) { }

  @Get("get-all-audits")
  getAllUsers(): Promise<AuditEntity[]> {
    return this.auditService.getAllAudits();
  }

  @Delete("clear-audits")
  clearUsers() {
    this.auditService.clearUsers();
  }
}
