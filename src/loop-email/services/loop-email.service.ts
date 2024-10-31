import { Injectable, NotFoundException } from '@nestjs/common';
import { LoopEmailRepository } from '../repositories/loop-email.repository';
import { CreateLoopEmailDto } from '../models/dto/create-loop-email.dto';
import { UpdateLoopEmailDto } from '../models/dto/update-loop-email.dto';
import { LoopEmail } from '../models/entities/loop-email.entity';

@Injectable()
export class LoopEmailService {
  constructor(private readonly loopEmailRepository: LoopEmailRepository) {}

  async create(createLoopEmailDto: CreateLoopEmailDto): Promise<LoopEmail> {
    return this.loopEmailRepository.create(createLoopEmailDto);
  }

  async findAll(month: string): Promise<LoopEmail[]> {
    return this.loopEmailRepository.findAll(month);
  }

  async findOne(id: string): Promise<LoopEmail> {
    const email = await this.loopEmailRepository.findById(id);
    if (!email) throw new NotFoundException(`LoopEmail with id ${id} not found`);
    return email;
  }

  async update(id: string, updateLoopEmailDto: UpdateLoopEmailDto): Promise<LoopEmail> {
    const email = await this.loopEmailRepository.update(id, updateLoopEmailDto);
    if (!email) throw new NotFoundException(`LoopEmail with id ${id} not found`);
    return email;
  }

  async delete(id: string): Promise<LoopEmail> {
    const email = await this.loopEmailRepository.delete(id);
    if (!email) throw new NotFoundException(`LoopEmail with id ${id} not found`);
    return email;
  }
}
