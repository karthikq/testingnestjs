import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/posts/post.entity';
import { PostsService } from 'src/posts/posts.service';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Comments } from './comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments) private repocomments: Repository<Comments>,
    private postSerive: PostsService,
  ) {}

  async AddComment(message: string, postId: number, user: User) {
    const post = await this.postSerive.getpost(postId);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    const newComment = await this.repocomments.create({
      message,
      user: user,
      post: post,
    });

    await this.repocomments.save(newComment);

    const updatedPost = await this.postSerive.getpost(postId);

    return updatedPost;
  }
}
