import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  createUser(body: createUserDto) {
    let userId = uuidv4();
    const newUser = this.repo.create({ ...body, userId });
    return this.repo.save(newUser);
  }
  async getUser(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async getAllusers() {
    const users = await this.repo.find({});
    if (!users.length) {
      throw new NotFoundException('No Users found');
    }

    return users;
  }
  async getUserbyId(id: string) {
    const user = await this.repo.findOne({ where: { userId: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async updateUser(id: number, body: UpdateUserDto) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, body);

    return this.repo.save(user);
  }
  async getUserbymail(email: string) {
    const getUser = await this.repo.findOne({ where: { email } });

    return getUser;
  }
}
