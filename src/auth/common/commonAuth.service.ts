import { Injectable } from "@nestjs/common";
import { SignInDto } from "./dto/signInDto";
import { SignUpDto } from "./dto/signUpDto";

@Injectable()
export class CommonAuthService {
  getHello(): string {
    return "Hello World!";
  }

  signIn(signInData: SignInDto): string {
    return `Signed in with email: ${signInData.email}, password: ${signInData.password}`;
  }

  signUp(signUpData: SignUpDto): string {
    return `Signed up with email: ${signUpData.email}, password: ${signUpData.password}`;
  }
}
