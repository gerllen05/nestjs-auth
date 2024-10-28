import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bullmq';
import { AuditEntity } from 'src/entities/audit.entity';
import { Repository } from 'typeorm';

@Processor('audit')
export class AuditConsumer extends WorkerHost {
  constructor(@InjectRepository(AuditEntity) private auditRepository: Repository<AuditEntity>) { super() }

  async process(job: Job<any, any, string>) {
    console.log(job.data, job.name)
    // const audit = { method: job.data.method, code: job.data.code }
    const audit = job.data
    await this.auditRepository.save(audit)
    return {}
  }
}