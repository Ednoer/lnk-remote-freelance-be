import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { LoginUserDto } from '../models/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findByEmail(loginUserDto.email);
    if (!user || !(await bcrypt.compare(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    user.tokenVersion += 1;

    const payload = { email: user.email, username: user.username, tokenVersion: user.tokenVersion };
    const token = this.jwtService.sign(payload);

    await this.userRepository.updateById(user.id, user);

    await this.userRepository.recordActivity(user.email, 'User logged in');
    return {
      data: {
        token
      }
    };
  }

  async logout(email: string) {
    const user = await this.userRepository.findByEmail(email);
    user.tokenVersion += 1;

    await this.userRepository.updateById(user.id, user);

    await this.userRepository.recordActivity(email, 'User logged out');
    return;
  }
}
