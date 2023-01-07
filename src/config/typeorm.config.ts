import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Comments } from 'src/comments/comments.entity';
import { Likes } from 'src/likes/likes.entity';
import { Posts } from 'src/posts/post.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      database: 'test',
      host: 'localhost',
      port: 5432,
      entities: [User, Posts, Comments, Likes],
      url: this.configService.get('DB_URL'),
      migrationsRun: true,
    };
  }
}
