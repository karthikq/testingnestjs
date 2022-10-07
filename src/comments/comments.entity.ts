import { Posts } from '../posts/post.entity';
import { User } from '../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Posts, (posts) => posts.comments)
  post: Posts;
}
