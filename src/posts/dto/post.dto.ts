import { Expose, Transform } from 'class-transformer';
import { User } from '../../user/user.entity';

export class PostDto {
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
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  user: User;
}
