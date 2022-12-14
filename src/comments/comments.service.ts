import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../posts/post.entity';
import { PostsService } from '../posts/posts.service';
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
      date: new Date(),
    });

    await this.repocomments.save(newComment);

    const updatedPost = await this.postSerive.getpost(postId);

    return updatedPost;
  }

  async EditComment(
    updatedmessage: string,
    commentId: number,
    postId: number,
    user: User,
  ) {
    const post = await this.postSerive.getpost(postId);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    if (post.user.userId === user.userId) {
      await this.repocomments
        .createQueryBuilder()
        .update(Comments)
        .set({ message: updatedmessage })
        .where('id = :id', { id: commentId })
        .execute();

      const updatedPost = await this.postSerive.getpost(postId);
      return updatedPost;
    } else {
      throw new BadRequestException('User not allowed to edit');
    }
  }

  async deleteComment(commentId: string, postId: number, user: User) {
    const post = await this.postSerive.getpost(postId);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    const checkUserId = post.comments.find((el) => el.id == commentId);

    if (checkUserId) {
      if (checkUserId.user.userId === user.userId) {
        await this.repocomments
          .createQueryBuilder()
          .delete()
          .from(Comments)
          .where('id =:id', { id: commentId })
          .execute();

        const updatedPost = await this.postSerive.getpost(postId);
        return updatedPost;
      } else {
        throw new BadRequestException('User not allowed to delete');
      }
    } else {
      throw new BadRequestException('Comment not found');
    }
  }
}
