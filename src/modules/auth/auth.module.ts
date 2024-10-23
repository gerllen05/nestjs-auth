import { Module } from "@nestjs/common";
import { CommonAuthModule } from "./common/commonAuth.module";

@Module({
  imports: [CommonAuthModule],
})
export class AuthModule {}
