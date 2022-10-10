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
    const user = await this.userService.CheckCredentials(email, password);

    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('Incorrect credentials');
    }
  }
}
