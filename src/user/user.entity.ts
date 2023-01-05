import { IsString } from 'class-validator';
import { Posts } from '../posts/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Likes } from '../likes/likes.entity';
import { Comments } from '../comments/comments.entity';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'Userslist',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    default: new Date().toLocaleTimeString(),
  })
  date: string;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({ default: 'null' })
  url: string;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column()
  userId: string;

  @OneToMany(() => Posts, (posts) => posts.user)
  posts: Posts[];

  @OneToMany(() => Likes, (likes) => likes.user)
  likes: Likes[];

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];
}
