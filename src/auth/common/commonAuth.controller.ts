import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommonAuthService } from "./commonAuth.service";
import { SignInDto } from "./dto/signInDto";
import { SignUpDto } from "./dto/signUpDto";
import { User } from "src/database/user/entities/user.entity";

@Controller(["auth/common"])
export class CommmonAuthController {
  constructor(private readonly commonAuthService: CommonAuthService) {}

  @Post("sign-in")
  signIn(@Body() signInData: SignInDto): string {
    return this.commonAuthService.signIn(signInData);
  }

  @Post("sign-up")
  signUp(@Body() signUpData: SignUpDto): string {
    return this.commonAuthService.signUp(signUpData);
  }

  @Get("all-users")
  getAllUsers(): Promise<User[]> {
    return this.commonAuthService.getAllUsers();
  }
}
