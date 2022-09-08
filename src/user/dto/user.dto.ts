import { Expose } from 'class-transformer';

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
}
