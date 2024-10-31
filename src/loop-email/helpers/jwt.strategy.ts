import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../repositories/user.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        done(null, configService.get<string>('JWT_SECRET'));
      },
    });
  }

  async validate(payload: any) {
    const user = await this.userRepo.findByEmail(payload.email);
    if (!user || user.tokenVersion !== payload.tokenVersion) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
