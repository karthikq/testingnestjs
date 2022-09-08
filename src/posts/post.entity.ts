import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
