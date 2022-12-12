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
    console.log(payload, 'S');
    const user = await this.userService.getUserbyId(payload.userId);

    if (!user) {
      throw new BadRequestException('Invalid token');
    }
    return user;
  }
}
