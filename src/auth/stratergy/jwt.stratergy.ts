import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class JWtStratergy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRECT'),
    });
  }
  async validate(payload: any) {
    const user = this.userService.getUserbymail(payload.sub);
    if (!user) {
      throw new BadRequestException('token expired');
    }
    return user;
  }
}
