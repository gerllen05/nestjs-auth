import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWTPayload } from '../../interfaces/jwtPayload.interface';
import { CommonAuthService } from '../commonAuth.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly commonAuthService: CommonAuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '123123123',
        });
    }


    async validate(payload: JWTPayload): Promise<User> {
        const signInData = { email: payload.email, password: payload.password };
        const user = await this.commonAuthService.validateUser(signInData);
        return user;
    }
}

