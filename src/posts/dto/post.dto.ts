import { Exclude, Expose, Transform } from 'class-transformer';
import { Comments } from '../../comments/comments.entity';
import { Likes } from '../../likes/likes.entity';
import { User } from '../../user/user.entity';
import { Posts } from '../post.entity';

export class PostDto {
  email: string;
  @Exclude({ toPlainOnly: true })
  password: string;
}
