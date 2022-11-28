import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-facebook';

@Injectable()
export class FacebookStratergy extends PassportStrategy(Strategy, 'facebook') {
  constructor(config: ConfigService) {
    super({
      clientID: config.get('FB_CLIENT_ID'),
      clientSecret: config.get('FB_CLIENT_SECRET'),
      scope: 'email',
      callbackURL: 'http://localhost:5000/auth/facebook/redirect',
      profileFields: ['id', 'displayName', 'photos', 'email'],
    });
  }
  async validate(token, refreshToken, profile: Profile, cb) {
    try {
      const { id, emails, name, photos, displayName } = profile;
      const user = {
        id,
        email: emails[0].value,
        username: displayName,
        url: photos[0].value,
      };
      cb(null, user);
    } catch (error) {
      cb(false, error);
    }
  }
}
