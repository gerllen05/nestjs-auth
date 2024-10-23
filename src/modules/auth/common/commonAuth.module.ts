import { Module } from "@nestjs/common";
import { CommmonAuthController } from "./commonAuth.controller";
import { CommonAuthService } from "./commonAuth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: '123123123',
      signOptions: { expiresIn: '30m' },
    }),],
  controllers: [CommmonAuthController],
  providers: [CommonAuthService],
})
export class CommonAuthModule { }
