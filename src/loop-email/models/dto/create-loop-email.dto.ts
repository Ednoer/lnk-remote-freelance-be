import { IsNotEmpty, IsString, IsDateString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLoopEmailDto {
  @ApiProperty({ example: 'hello@gmail.com', description: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '2023-10-30T00:00:00.000Z', description: 'Tanggal email' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({ example: 'Deskripsi email', description: 'Deskripsi dari email' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'user123', description: 'Pengguna yang membuat data' })
  @IsOptional()
  @IsString()
  created_by?: string;
}
