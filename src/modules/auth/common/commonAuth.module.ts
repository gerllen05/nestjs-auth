import { Module } from "@nestjs/common";
import { CommmonAuthController } from "./commonAuth.controller";
import { CommonAuthService } from "./commonAuth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CommmonAuthController],
  providers: [CommonAuthService],
})
export class CommonAuthModule {}
