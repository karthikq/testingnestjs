import { User } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Likes } from '../likes/likes.entity';
 

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desp: string;

  @Column()
  postId: string;

  @Column({
    default: new Date().toLocaleDateString(),
  })
  date: string;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: string;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Likes, (likes) =>likes.post)
  likes: Likes[];

}
