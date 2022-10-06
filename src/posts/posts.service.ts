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
    @InjectRepository(Likes) private repoLikes: Repository<Likes>,
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
      relations: ['likes', 'user'],
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }
    return post;
  }

  async likePost(id: number, user: any) {
    const post = await this.repo.findOne({
      where: { id },
      relations: {
        likes: { user: true, post: true },
        user: true,
      },
    });
    if (!post) {
      throw new BadRequestException('Post not found');
    }

    const newLike = await this.repoLikes.create({
      user: user,
      post: post,
    });
    await this.repoLikes.save(newLike);
    const updatedpost = await this.repo.findOne({
      where: { id },
      relations: {
        likes: { user: true, post: true },
        user: true,
      },
    });

    return updatedpost;
  }
}
