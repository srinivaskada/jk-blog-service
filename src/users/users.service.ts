import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SocialAccountType } from 'src/types/common.type';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name)
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  findOneBySocialAccountId(socialAccountType: SocialAccountType, socialAccountId: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        socialAccountType,
        socialAccountId
      }
    });
  }

  async createUser(user: Partial<User>, requestId: string) {
    const result = await this.userRepository.insert({
      name: user.name,
      email: user.email,
      socialAccountType: user.socialAccountType,
      socialAccountId: user.socialAccountId
    })
    this.logger.log('New user created successfully', {
      requestId,
      user,
      result
    })
    return result.identifiers[0].id as number
  }
}