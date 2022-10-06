import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { UserModule } from '../user/user.module';
import { LikesModule } from '../likes/likes.module';
import { Likes } from '../likes/likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts,Likes]), UserModule,LikesModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
