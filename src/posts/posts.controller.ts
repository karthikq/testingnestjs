import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';

import { Serialize } from '../interceptors/transform.interceptor';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('post')
@Serialize(PostDto)
export class PostsController {
  constructor(private postService: PostsService) {}

  @UseGuards(JWTAuthGuard)
  @Post('/create')
  createPost(@Body() body: CreatePostDto, @Request() req: any) {
    console.log('S');

    return this.postService.createPost(body, req.user);
  }

  @Get('/:id')
  getPost(@Param('id') id: string) {
    return this.postService.getpost(parseInt(id));
  }
}
