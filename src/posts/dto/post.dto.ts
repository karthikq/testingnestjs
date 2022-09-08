import { Expose } from 'class-transformer';

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
}
