import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { UserModule } from '../user/user.module';
import { LikesModule } from '../likes/likes.module';
import { Likes } from '../likes/likes.entity';
import { Comments } from 'src/comments/comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Likes, Comments]), UserModule],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
