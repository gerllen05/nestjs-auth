import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./modules/auth/auth.module";

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
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
