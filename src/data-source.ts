import { DataSource, DataSourceOptions } from 'typeorm';
import { Comments } from './comments/comments.entity';
import { Likes } from './likes/likes.entity';
import { Posts } from './posts/post.entity';
import { User } from './user/user.entity';

export const appDataSource = new DataSource({
  type: 'postgres',
  database: 'test',
  host: 'localhost',
  port: 5432,
  entities: [User, Comments, Posts, Likes],
  migrations: [__dirname + '/migrations/*.ts'],
  url: 'postgres://cdiiyvhh:4PmPCoFI7s-9XMDUXMEQyeNQj1btoIHt@snuffleupagus.db.elephantsql.com/cdiiyvhh',
  migrationsRun: true,
} as DataSourceOptions);
