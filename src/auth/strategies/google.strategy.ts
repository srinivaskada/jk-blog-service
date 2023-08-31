import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { SocialAccountType } from 'src/types/common.type';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_AUTH_CALLBACK_URL'),
      scope: ['email', 'profile'],
    })
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    const user: Partial<User> = {
      socialAccountId: id,
      socialAccountType: SocialAccountType.Google,
      email: emails[0].value,
      name: [name.givenName, name.familyName].filter(v => v).join(' '),
      // firstName: name.givenName,
      // lastName: name.familyName,
      // picture: photos[0].value,
      // accessToken,
      // refreshToken,
    }
    done(null, user)
  }
}