import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { JwtPayloadUser } from 'src/types/common.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
   private configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayloadUser) {
    const user = await this.userRepository.findOne({
      where: {
        id: payload.sub
      }
    });

    if (!user) throw new UnauthorizedException();
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}