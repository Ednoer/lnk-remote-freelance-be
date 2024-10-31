import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoopEmailService } from './services/loop-email.service';
import { LoopEmailRepository } from './repositories/loop-email.repository';
import { LoopEmail, LoopEmailSchema } from './models/entities/loop-email.entity';
import { LoopEmailController } from './controllers/loop-email.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserRepository } from './repositories/user.repository';
import { User, UserSchema } from './models/entities/user.entity';
import { UserActivity, UserActivitySchema } from './models/entities/user-activity.entity';
import { JwtStrategy } from './helpers/jwt.strategy';
import { EmailService } from './services/email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: LoopEmail.name, schema: LoopEmailSchema },
      { name: User.name, schema: UserSchema },
      { name: UserActivity.name, schema: UserActivitySchema },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [LoopEmailController, AuthController],
  providers: [
    LoopEmailService, 
    LoopEmailRepository, 
    AuthService, 
    UserRepository, 
    JwtStrategy,
    EmailService
  ],
})
export class LoopEmailModule {}
