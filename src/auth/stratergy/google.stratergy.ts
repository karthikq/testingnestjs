import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth2';

@Injectable()
export class GoogleStratergy extends PassportStrategy(Strategy, 'google') {
  constructor(config: ConfigService) {
    super({
      clientSecret: config.get('CLIENT_SECRET'),
      clientID: config.get('CLIENT_ID'),
      callbackURL:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:5000/auth/google/cb'
          : 'https://testingnestjs2.onrender.com/auth/google/cb',
      scope: ['email', 'profile'],
    });
  }
  async validate(access_token, refreshToken, profile: any, done) {
    try {
      const { name, emails, photos } = profile;
      const user = {
        username: name.givenName + '' + name.familyName,
        email: emails[0].value,
        url: photos[0].value,
        id: profile.id,
      };

      done(null, user);
    } catch (error) {
      console.log(error);

      done(false, 'error');
    }
  }
}
