import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./modules/auth/auth.module";
import { CacheModule, CacheStore } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";
import { BullModule } from "@nestjs/bullmq";
import { CommmonAuthController } from "./modules/auth/controllers/commonAuth.controller";
import { AuditModule } from "./modules/audit/audit.module";
import { AuditMiddleware } from "./modules/audit/audit.middleware";
import { AuditController } from "./modules/audit/audit.controller";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: "postgres", // for docker
        // host: configService.getOrThrow('POSTGRES_HOST'), // for local
        port: configService.getOrThrow("POSTGRES_PORT"),
        username: configService.getOrThrow("POSTGRES_USERNAME"),
        password: configService.getOrThrow("POSTGRES_PASSWORD"),
        database: configService.getOrThrow("POSTGRES_DATABASE"),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: "redis", // for docker
            // host: configService.getOrThrow("REDIS_HOST"), // for local
            port: configService.getOrThrow("REDIS_PORT"),
          },
        });
        return {
          store: store as unknown as CacheStore,
          ttl: 3 * 60000, // 3 minutes (milliseconds)
        };
      }
    }),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: "redis", // for docker
          // host: configService.getOrThrow("REDIS_HOST"), // for local
          port: configService.getOrThrow("REDIS_PORT"),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: "audit",
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AuditModule
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuditMiddleware)
      .forRoutes(CommmonAuthController, AuditController);
  }
}
