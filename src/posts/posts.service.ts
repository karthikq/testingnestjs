import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Posts } from './post.entity';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class PostsService {
  constructor(@InjectRepository(Posts) private repo: Repository<Posts>) {}
  async createPost(body: CreatePostDto) {
    const newPost = await this.repo.create({
      title: body.title,
      desp: body.desp,
      postId: uuidv4(),
    });
    return this.repo.save(newPost);
  }
}
