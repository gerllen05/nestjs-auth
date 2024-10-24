import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SignInDto } from "./dto/signIn.dto";
import { SignUpDto } from "./dto/signUp.dto";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { JWTPayload } from "../interfaces/jwtPayload.interface";

@Injectable()
export class CommonAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) { }

  signUp(signUpDto: SignUpDto) {
    this.userRepository.save(signUpDto);
    console.log(`Signed up with email: ${signUpDto.email}, password: ${signUpDto.password}`);
  }

  async validateUser(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({ email: signInDto.email });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.validateUser(signInDto);
    console.log(`Signed in with email: ${signInDto.email}, password: ${signInDto.password}`);

    const payload: JWTPayload = { sub: user.id, email: user.email, password: user.password, auth_method: 'common' };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  clearUsers() {
    this.userRepository.clear();
  }
}
