import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../posts/post.entity';
import { Repository } from 'typeorm';
import { Likes } from './likes.entity';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Likes) private repoLikes: Repository<Likes>,
    private postservice: PostsService,
  ) {}
  async likePost(id: number, user: any) {
    const post = await this.postservice.getpost(id);

    if (!post) {
      throw new BadRequestException('Post not found');
    }
    const checkalreadyLiked = post.likes.some((el) => el.user.id === user.id);

    if (checkalreadyLiked) {
      await this.repoLikes
        .createQueryBuilder()
        .delete()
        .from(Likes)
        .where('user.id = :id', { id: user.id })
        .execute();

      const updatedpost = await this.postservice.getpost(id);

      return updatedpost;
    }

    const newLike = await this.repoLikes.create({
      user: user,
      post: post,
    });
    await this.repoLikes.save(newLike);

    const updatedpost = await this.postservice.getpost(id);

    return updatedpost;
  }
}
