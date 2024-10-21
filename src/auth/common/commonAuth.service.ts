import { Injectable } from "@nestjs/common";
import { SignInDto } from "./dto/signInDto";
import { SignUpDto } from "./dto/signUpDto";
import { UserService } from "src/database/user/user.service";
import { User } from "src/database/user/entities/user.entity";

@Injectable()
export class CommonAuthService {
  constructor(private readonly userService: UserService) {}

  signIn(signInData: SignInDto): string {
    return `Signed in with email: ${signInData.email}, password: ${signInData.password}`;
  }

  signUp(signUpData: SignUpDto): string {
    this.userService.create(signUpData);
    return `Signed up with email: ${signUpData.email}, password: ${signUpData.password}`;
  }

  getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }
}
