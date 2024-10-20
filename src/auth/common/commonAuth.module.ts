import { Module } from "@nestjs/common";
import { CommmonAuthController } from "./commonAuth.controller";
import { CommonAuthService } from "./commonAuth.service";

@Module({
  controllers: [CommmonAuthController],
  providers: [CommonAuthService],
})
export class CommonAuthModule {}
