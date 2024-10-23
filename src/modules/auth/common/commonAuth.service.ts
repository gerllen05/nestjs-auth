import { Injectable } from "@nestjs/common";
import { SignInDto } from "./dto/signInDto";
import { SignUpDto } from "./dto/signUpDto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CommonAuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  signIn(signInData: SignInDto): string {
    return `Signed in with email: ${signInData.email}, password: ${signInData.password}`;
  }

  signUp(signUpData: SignUpDto): string {
    this.userRepository.create(signUpData);
    return `Signed up with email: ${signUpData.email}, password: ${signUpData.password}`;
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
