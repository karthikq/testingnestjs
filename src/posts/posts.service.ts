import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Posts } from './post.entity';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Likes } from '../likes/likes.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private repo: Repository<Posts>,
    private userService: UserService,
  ) {}
  async createPost(body: CreatePostDto, user: User) {
    const newPost = await this.repo.create({
      title: body.title,
      desp: body.desp,
      postId: uuidv4(),
      user: user,
    });

    return this.repo.save(newPost);
  }

  async getpost(id: number) {
    const post = await this.repo.findOne({
      where: { id },
      relations: {
        likes: { post: true, user: true },
        user: true,
        comments: { post: true, user: true },
      },
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }
    return post;
  }
}
