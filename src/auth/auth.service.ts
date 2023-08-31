import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { SocialAccountType } from 'src/types/common.type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async signIn(user: Partial<User>) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }
    const userExists = await this.findUserBySocialId(user.socialAccountId, user.socialAccountType);
    if (!userExists) {
      return this.registerUser(user);
    }
    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
    });
  }

  async registerUser(user: Partial<User>) {
    try {
      const newUser = this.userRepository.create(user)
      await this.userRepository.save(newUser)

      return this.generateJwt({
        sub: newUser.id,
        email: newUser.email,
      })
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findUserBySocialId(socialAccountId: string, socialAccountType: SocialAccountType) {
    const user = await this.userRepository.findOne({
      where: {
        socialAccountId,
        socialAccountType
      }
    });

    if (!user) {
      return null;
    }
    return user;
  }
}