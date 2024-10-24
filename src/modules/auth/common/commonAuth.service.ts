import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SignInDto } from "./dto/signInDto";
import { SignUpDto } from "./dto/signUpDto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class CommonAuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  signUp(signUpDto: SignUpDto): string {
    this.userRepository.save(signUpDto);
    console.log(`Signed up with email: ${signUpDto.email}, password: ${signUpDto.password}`);
    return "123";
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({ email: signInDto.email });
    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }
    console.log(`Signed in with email: ${signInDto.email}, password: ${signInDto.password}`);

    const payload = { sub: user.id, email: user.email, password: user.password, auth_method: 'common' };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  clearUsers() {
    this.userRepository.clear();
  }
}
