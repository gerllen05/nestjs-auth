import { Body, Controller, Post } from "@nestjs/common";
import { CommonAuthService } from "./commonAuth.service";
import { SignInDto } from "./dto/signInDto";
import { SignUpDto } from "./dto/signUpDto";

@Controller(["auth/common"])
export class CommmonAuthController {
  constructor(private readonly commonAuthService: CommonAuthService) {}

  @Post("sign-in")
  signIn(@Body() signInData: SignInDto): string {
    return this.commonAuthService.signIn(signInData);
  }

  @Post("sign-up")
  signUp(@Body() signUpData: SignUpDto): string {
    return this.commonAuthService.signIn(signUpData);
  }
}
