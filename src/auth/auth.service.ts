import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { authDto } from './dto/auth-user.dto';
import { LocalGuard } from './local-auth.guard';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private userService: UserService,
  ) {}
  async singup(data: authDto) {
    try {
      const findUser = await this.userService.getUserbymail(data.email);
      if (!findUser) {
        const newUser = await this.repo.create(data);
        return newUser;
      }
    } catch (error) {
      console.log(error);
    }
  }
  @UseGuards(LocalGuard)
  async signin(email: string, password: string) {}
}
