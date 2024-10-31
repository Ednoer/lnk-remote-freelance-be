import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLoopEmailDto {
  @ApiProperty({ example: '2023-10-30T00:00:00.000Z', description: 'Tanggal email' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({ example: 'Deskripsi email', description: 'Deskripsi dari email' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'user123', description: 'Pengguna yang membuat data' })
  @IsNotEmpty()
  @IsString()
  created_by: string;
}
