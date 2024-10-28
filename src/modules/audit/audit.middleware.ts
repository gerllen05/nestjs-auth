import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Queue } from 'bullmq';
import { Request, Response, NextFunction } from 'express';
import { AuditEntity } from 'src/entities/audit.entity';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  constructor(@InjectQueue('audit') private auditQueue: Queue) { }

  async use(req: Request, res: Response, next: NextFunction) {
    console.log(req.user)
    const audit = {
      method: req?.method,
      code: res?.statusCode,
    }
    await this.auditQueue.add("log", audit)
    next();
  }
}