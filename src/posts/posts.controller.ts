import { Controller, Post, Body } from '@nestjs/common';
import { Serialize } from '../interceptors/transform.interceptor';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('post')
@Serialize(PostDto)
export class PostsController {
  constructor(private postService: PostsService) {}
  @Post('/create')
  createPost(@Body() body: CreatePostDto) {
    return this.postService.createPost(body);
  }
}
