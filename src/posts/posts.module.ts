import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
