import { SocialAccountType, UserId } from 'src/types/common.type';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: UserId;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  socialAccountType: SocialAccountType

  @Column()
  socialAccountId: string

  @CreateDateColumn({
    type: 'timestamp'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp'
  })
  updatedAt: Date;
}