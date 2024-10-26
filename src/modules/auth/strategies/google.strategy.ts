import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { GoogleProfile } from '../interfaces/googleProfile.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(
		private configService: ConfigService,
	) {
		super({
			clientID: configService.getOrThrow('GOOGLE_CLIENT_ID'),
			clientSecret: configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
			callbackURL: configService.getOrThrow('GOOGLE_CLIENT_CALLBACK_URL'),
			scope: ['profile', 'email'],
		});
	}

	async validate(accessToken: string, refreshToken: string, profile: GoogleProfile, done: VerifyCallback) {
		const { name, emails, photos } = profile;
		const user = {
			email: emails[0].value,
			firstName: name.givenName,
			lastName: name.familyName,
			picture: photos[0].value,
			accessToken
		};
		console.log(profile);
		done(null, user);
	}
}