import { Injectable, Request, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { authDto } from './dto/auth-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async singup(data: authDto) {
    const findUser = await this.userService.getUserbymail(data.email);
    if (!findUser) {
      const newUser = await this.userService.createUser(data);
      const payload = { username: newUser.username, sub: newUser.email };
      return { access_token: this.jwtService.sign(payload) };
    } else {
      throw new BadRequestException(
        `User with email ${data.email} already exits`,
      );
    }
  }
  login(user: any) {
    const payload = { userId: user.userId, sub: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
