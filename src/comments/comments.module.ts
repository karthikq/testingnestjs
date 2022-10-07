import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comments]), PostsModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
