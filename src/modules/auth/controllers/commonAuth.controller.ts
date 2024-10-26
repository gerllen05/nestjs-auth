import { Body, Controller, Delete, Get, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { SignInDto } from "../dto/signIn.dto";
import { SignUpDto } from "../dto/signUp.dto";
import { UserEntity } from "src/entities/user.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtDto } from "../dto/jwt.dto";
import { CurrentUser } from "src/decorators/currentUser.decorator";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/decorators/roles.deorator";
import { Role } from "src/enums/role.enum";
import { RolesGuard } from "src/guards/roles.guard";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";

@ApiTags("auth")
@Controller(["auth/common"])
export class CommmonAuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("sign-up")
  signUp(@Body() signUpDto: SignUpDto) {
    this.authService.signUp(signUpDto);
  }

  @Post("sign-in")
  signIn(@Body() signInDto: SignInDto): Promise<JwtDto> {
    return this.authService.signIn(signInDto);
  }

  @Get("user")
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 1000)
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  getUser(@CurrentUser() user: UserEntity) {
    return user;
  }

  @Get("get-all-users")
  getAllUsers(): Promise<UserEntity[]> {
    return this.authService.getAllUsers();
  }

  @Delete("clear-users")
  clearUsers() {
    this.authService.clearUsers();
  }
}
