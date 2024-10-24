import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { CommonAuthService } from "./commonAuth.service";
import { SignInDto } from "./dto/signIn.dto";
import { SignUpDto } from "./dto/signUp.dto";
import { User } from "src/entities/user.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller(['auth/common'])
export class CommmonAuthController {
  constructor(private readonly commonAuthService: CommonAuthService) { }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    this.commonAuthService.signUp(signUpDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<{ access_token: string }> {
    return this.commonAuthService.signIn(signInDto);
  }

  @Get('get-all-users')
  getAllUsers(): Promise<User[]> {
    return this.commonAuthService.getAllUsers();
  }

  @Delete('clear-users')
  clearUsers() {
    this.commonAuthService.clearUsers();
  }
}
