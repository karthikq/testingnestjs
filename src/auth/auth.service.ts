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
      const checkUserName = await this.userService.checkUserName(data.username);
      if (checkUserName) {
        throw new BadRequestException(`username already exits`);
      } else {
        const newUser = await this.userService.createUser(data);
        const payload = {
          username: newUser.username,
          sub: newUser.email,
          userId: newUser.userId,
        };

        return { newUser, access_token: this.jwtService.sign(payload) };
      }
    } else {
      throw new BadRequestException(
        `User with email ${data.email} already exits`,
      );
    }
  }
  async login(user: any) {
    console.log(user);

    const payload = { userId: user.userId, sub: user.email };

    return {
      ...user,
      comments: user.comments,
      access_token: this.jwtService.sign(payload),
    };
  }

  async googleLogin(user: any, res: any) {
    if (!user) {
      return 'User not found';
    }
    const payload = { userId: user.id, sub: user.email };

    const checkGoogleUser = await this.userService.getUserbyId(user.id);

    const token = this.jwtService.sign(payload);

    if (!checkGoogleUser) {
      await this.userService.createUser(user);
    }

    return res.redirect('http://localhost:3000/?token=' + token);
  }

  async facebookLogin(user: any, res: any) {
    if (!user) {
      return 'User not found';
    }
    const payload = { userId: user.id, sub: user.email };

    const checkFacebookUser = await this.userService.getUserbyId(user.id);

    const token = this.jwtService.sign(payload);

    if (!checkFacebookUser) {
      await this.userService.createUser(user);
    }

    return res.redirect('http://localhost:3000/?token=' + token);
  }
}
