import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'hello@gmail.com', description: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'password' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'endang', description: 'password' })
  @IsNotEmpty()
  @IsString()
  username: string;
}
