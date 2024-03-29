import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Posts } from './post.entity';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Likes } from '../likes/likes.entity';
import { Comments } from 'src/comments/comments.entity';
import { editPostDto } from './dto/edit-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private repo: Repository<Posts>,
    @InjectRepository(Likes) private repoLikes: Repository<Likes>,
    @InjectRepository(Comments) private repoComments: Repository<Comments>,
    private userService: UserService,
  ) {}
  async createPost(body: CreatePostDto, user: User) {
    const newPost = await this.repo.create({
      title: body.title.trim(),
      desp: body.desp.trim(),
      postId: uuidv4(),
      images: body.images,
      user: user,
      likes: [],
      comments: [],
      date: new Date(),
      videoUrl: body.videoUrl,
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
  async getAllposts() {
    const posts = await this.repo.find({
      relations: {
        user: true,
        likes: { user: true },
        comments: { user: true },
      },
    });

    if (!posts.length) {
      throw new BadRequestException('No posts found');
    }
    return posts;
  }
  async deletePost(id: string, user: any) {
    const findPost = await this.repo.findOne({
      where: { postId: id },
      relations: { user: true, likes: true, comments: true },
    });

    if (!findPost) {
      throw new NotFoundException('Post not found');
    }
    if (findPost.user.userId === user.userId) {
      findPost.likes.map(async (el) => {
        const deleteItem = await this.repoLikes.delete({ id: el.id });
      });

      findPost.comments.map(async (el) => {
        const deleteItem = await this.repoComments.delete({ id: el.id });
      });

      const updatePost = await this.repo.delete({ postId: id });
    } else {
      throw new BadRequestException('Not allowed');
    }
  }

  async editPost(id: string, user: any, data: editPostDto) {
    const findPost = await this.repo.findOne({
      where: { postId: id },
      relations: { user: true },
    });

    if (!findPost) {
      throw new NotFoundException('Post not found');
    }

    if (findPost.user.userId === user.userId) {
      await this.repo
        .createQueryBuilder('post')
        .update<Posts>(Posts, { title: data.title.trim(), images: data.images })
        .where('postId = :id', { id })
        .execute();

      const updatedPost = await this.repo.findOne({
        where: { postId: id },
        relations: {
          user: true,
          likes: { user: true },
          comments: { user: true },
        },
      });

      return updatedPost;
    } else {
      throw new BadRequestException('Not allowed');
    }
  }
}
