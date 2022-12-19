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
import * as bcrypt from 'bcrypt';
import { brotliCompressSync } from 'zlib';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async createUser(body: createUserDto) {
    let userId = body.id ? body.id : uuidv4();
    const hashedPassword = body.password
      ? await bcrypt.hash(body.password, 10)
      : '';

    const newUser = this.repo.create({
      email: body.email,
      password: hashedPassword,
      username: body.username,
      url: body.url,
      userId,
    });
    await this.repo.save(newUser);
    const user = await this.repo.findOne({
      where: { email: body.email },
      relations: {
        posts: true,
        likes: { post: true, user: true },
        comments: { post: true, user: true },
      },
    });
    return user;
  }

  async CheckCredentials(email: string, password: string) {
    const resp = await this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email =:email', { email })
      .getOne();

    const user = await this.repo.findOne({
      where: { email },
      relations: {
        posts: true,
        likes: { post: true, user: true },
        comments: { post: true, user: true },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const checkPassword = await bcrypt.compare(password, resp.password);
    if (!checkPassword) {
      throw new BadRequestException("Password doesn't match");
    }
    return user;
  }

  async getUser(id: string) {
    const user = await this.repo.findOne({
      where: { userId: id },
      relations: {
        posts: true,
        likes: { post: true, user: true },
        comments: { post: true, user: true },
      },
    });

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
    if (!id) {
      throw new NotFoundException('User not found');
    }

    const user = await this.repo.findOne({
      where: { userId: id },
      relations: {
        posts: true,
        likes: { post: true, user: true },
        comments: { post: true, user: true },
      },
    });

    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }
    return user;
  }
  async updateUser(id: string, body: UpdateUserDto, loggedUser: any) {
    const user = await this.repo.findOne({ where: { userId: id } });
    if (loggedUser.userId === user.userId) {
      if (!user) {
        throw new NotFoundException('User not found');
      }

      Object.assign(user, body);

      return this.repo.save(user);
    } else {
      return new BadRequestException('User not allowed');
    }
  }
  async getUserbymail(email: string) {
    if (!email) {
      throw new NotFoundException('Email not found');
    }
    const getUser = await this.repo.findOne({
      where: { email },
      relations: {
        posts: true,
        likes: { post: true, user: true },
        comments: { post: true, user: true },
      },
    });

    return getUser;
  }

  async checkUserName(username: string) {
    if (!username) {
      throw new NotFoundException('User is not valid');
    }
    const checkName = await this.repo.findOne({ where: { username } });

    if (checkName) {
      throw new BadRequestException('username already exists');
    } else {
      return false;
    }
  }
}
