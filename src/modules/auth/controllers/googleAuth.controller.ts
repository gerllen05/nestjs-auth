import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { ApiTags } from "@nestjs/swagger";
import { GoogleAuthGuard } from "../guards/googleAuth.guard";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/decorators/currentUser.decorator";
import { GoogleUserInterface } from "../interfaces/googleUser.interface";

@ApiTags('auth')
@Controller(['auth/google'])
export class GoogleAuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  async redirect() {
    console.log("Redirected");
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  getUserData(@CurrentUser() user: GoogleUserInterface) {
    return this.authService.googleAuth(user);
  }

}