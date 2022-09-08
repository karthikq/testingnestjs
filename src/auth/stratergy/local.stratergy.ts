import { PassportStrategy } from '@nestjs/passport';

import { UserService } from '../../user/user.service';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStratergy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserbymail(email);

    if (user && user.password === password) {
      return user;
    } else {
      throw new UnauthorizedException('Incorrect credentials');
    }
  }
}
