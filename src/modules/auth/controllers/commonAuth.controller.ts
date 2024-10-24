import { Body, Controller, Delete, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { SignInDto } from "../dto/signIn.dto";
import { SignUpDto } from "../dto/signUp.dto";
import { UserEntity } from "src/entities/user.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtDto } from "../dto/jwt.dto";
import { Request } from "express";
import { CurrentUser } from "src/decorators/currentUser.decorator";
import { AuthGuard } from "@nestjs/passport";

@ApiTags('auth')
@Controller(['auth/common'])
export class CommmonAuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<JwtDto> {
    return this.authService.signIn(signInDto);
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  getUser(@Req() req: Request, @CurrentUser() user: UserEntity) {
    return user;
  }

  @Get('get-all-users')
  getAllUsers(): Promise<UserEntity[]> {
    return this.authService.getAllUsers();
  }

  @Delete('clear-users')
  clearUsers() {
    this.authService.clearUsers();
  }
}
