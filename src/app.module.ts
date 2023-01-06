import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Posts } from './posts/post.entity';
import { LikesModule } from './likes/likes.module';
import { Likes } from './likes/likes.entity';
import { CommentsModule } from './comments/comments.module';
import { Comments } from './comments/comments.entity';
 

import dbConfig from '../ormconfig.js';
 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.development`,
    }),
    TypeOrmModule.forRoot(dbConfig),
    UserModule,
    AuthModule,
    PostsModule,
    LikesModule,
    CommentsModule,
  ],
})
export class AppModule {}
