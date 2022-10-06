import { Expose, Transform } from 'class-transformer';
import { Posts } from '../../posts/post.entity';

export class userDto {
  @Expose()
  id: number;

  @Expose()
  username: string;
  @Expose()
  email: string;

  @Expose()
  updated_at: string;

  @Expose()
  created_at: string;

  @Expose()
  access_token: string;

  @Expose()
  userId: string;

  @Expose()
  title: string;

  @Expose()
  posts: Posts[];
}
