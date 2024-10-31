import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty({ example: 'to@gmail.com', description: 'to' })
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @ApiProperty({ example: 'subject@gmail.com', description: 'subject' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'Hi Salam kenal', description: 'text' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: '<h1>Hi Html</h1>', description: 'text' })
  @IsString()
  @IsOptional()
  html?: string;
}
