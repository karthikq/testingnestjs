import { Exclude, Expose, Transform } from 'class-transformer';
import { Posts } from '../../posts/post.entity';
import { Likes } from '../../likes/likes.entity';
import { User } from '../../user/user.entity';
import { Comments } from '../comments.entity';

export class CommetDto {
  @Expose()
  message: string;

  @Expose()
  title: string;

  @Expose()
  desp: string;

  @Expose()
  created_at: string;

  @Expose()
  updated_at: string;

  @Expose()
  date: string;

  @Expose()
  postId: string;

  @Expose()
  user: User;

  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  access_token: string;

  @Expose()
  userId: string;

  @Expose()
  posts: Posts[];

  @Expose()
  likes: Likes[];

  @Expose()
  comments: Comments[];

  @Exclude()
  password: string;
}
