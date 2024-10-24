import { Body, Controller, Delete, Get, Post, Req, UseGuards } from "@nestjs/common";
import { CommonAuthService } from "./commonAuth.service";
import { SignInDto } from "./dto/signIn.dto";
import { SignUpDto } from "./dto/signUp.dto";
import { User } from "src/entities/user.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtDto } from "./dto/jwt.dto";
import { JwtAuthGuard } from "./guards/jwtAuth.guard";
import { Request } from "express";

@ApiTags('auth')
@Controller(['auth/common'])
export class CommmonAuthController {
  constructor(private readonly commonAuthService: CommonAuthService) { }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    this.commonAuthService.signUp(signUpDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<JwtDto> {
    return this.commonAuthService.signIn(signInDto);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getUser(@Req() req: Request) {
    return req.user;
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
