import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'hello@gmail.com', description: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'password' })
  @IsNotEmpty()
  password: string;
}
