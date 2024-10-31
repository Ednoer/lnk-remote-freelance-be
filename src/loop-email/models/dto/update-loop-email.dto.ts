import { IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLoopEmailDto {
  @ApiPropertyOptional({ example: '2023-10-31T00:00:00.000Z', description: 'Tanggal email' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ example: 'Deskripsi update email', description: 'Deskripsi yang diperbarui dari email' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'user456', description: 'Pengguna yang memperbarui data' })
  @IsOptional()
  @IsString()
  updated_by?: string;
}
