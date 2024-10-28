import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { JWTPayloadInterface } from "./interfaces/jwtPayload.interface";
import { SignUpDto } from "./dto/signUp.dto";
import { SignInDto } from "./dto/signIn.dto";
import { GoogleUserInterface } from "./interfaces/googleUser.interface";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async validateUserByPassword(signInDto: SignInDto) {
    const user = await this.findUserByEmail(signInDto.email);
    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async signUp(signUpDto: SignUpDto) {
    // const user = await this.userRepository.findOneBy({ email: signUpDto.email });
    // if (user) {
    //   throw new UnauthorizedException();
    // }
    this.userRepository.save(signUpDto);
    console.log(
      `Signed up with email: ${signUpDto.email}, password: ${signUpDto.password}`,
    );
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.validateUserByPassword(signInDto);
    console.log(
      `Signed in with email: ${signInDto.email}, password: ${signInDto.password}`,
    );

    const payload: JWTPayloadInterface = {
      sub: user.id,
      email: user.email,
      auth_method: "common",
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async googleAuth(googleUser: GoogleUserInterface) {
    let user = await this.userRepository.findOneBy({ email: googleUser.email });
    if (!user) {
      user = new UserEntity({ email: googleUser.email });
      this.userRepository.save(user);
      console.log(`Signed up with google email: ${googleUser.email}`);
    }

    console.log(`Signed in with google email: ${googleUser.email}`);
    const payload: JWTPayloadInterface = {
      sub: user.id,
      email: user.email,
      auth_method: "common",
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async clearUsers() {
    await this.userRepository.clear();
  }
}
