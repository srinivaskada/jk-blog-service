import { BlogId } from 'src/types/common.type';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('blog')
export class Blog {
  @PrimaryGeneratedColumn()
  id: BlogId;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn({
    type: 'timestamp'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp'
  })
  updatedAt: Date;
}