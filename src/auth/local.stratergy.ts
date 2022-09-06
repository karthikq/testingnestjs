import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Stratergy } from 'passport-local';
import { UserService } from 'src/user/user.service';
import { UnauthorizedException } from '@nestjs/common';

export class LocalStratergy extends PassportStrategy(Stratergy) {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super();
  }
  async validate(email: string, password: string) {
    const user = await this.userService.getUserbymail(email);
    if (user && user.password === password) {
      return user;
    } else {
      throw new UnauthorizedException('Incorrect credentials');
    }
  }
}
