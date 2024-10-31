import { Injectable, NotFoundException } from '@nestjs/common';
import { LoopEmailRepository } from '../repositories/loop-email.repository';
import { CreateLoopEmailDto } from '../models/dto/create-loop-email.dto';
import { UpdateLoopEmailDto } from '../models/dto/update-loop-email.dto';
import { LoopEmail } from '../models/entities/loop-email.entity';
import { EmailService } from './email.service';

@Injectable()
export class LoopEmailService {
  constructor(
    private readonly loopEmailRepository: LoopEmailRepository,
    private readonly emailService: EmailService
  ) {}

  async create(createLoopEmailDto: CreateLoopEmailDto, email: string): Promise<LoopEmail> {
    const loopEmail = await this.loopEmailRepository.create(createLoopEmailDto, email);

    const emailResult = await this.emailService.sendEmail(
        createLoopEmailDto.email,
        `Subject: ${createLoopEmailDto.date}`,
        createLoopEmailDto.description,
        null
    );

    return loopEmail;
  }

  async findAll(month: string): Promise<LoopEmail[]> {
    return this.loopEmailRepository.findAll(month);
  }

  async findOne(id: string): Promise<LoopEmail> {
    const email = await this.loopEmailRepository.findById(id);
    if (!email) throw new NotFoundException(`LoopEmail with id ${id} not found`);
    return email;
  }

  async update(id: string, updateLoopEmailDto: UpdateLoopEmailDto, email: string): Promise<LoopEmail> {
    const emailUpdater = await this.loopEmailRepository.update(id, updateLoopEmailDto, email);
    if (!emailUpdater) throw new NotFoundException(`LoopEmail with id ${id} not found`);

    const emailResult = await this.emailService.sendEmail(
      updateLoopEmailDto.email,
      `Subject: ${updateLoopEmailDto.date}`,
      updateLoopEmailDto.description,
      null
  );

    return emailUpdater;
  }

  async delete(id: string): Promise<LoopEmail> {
    const email = await this.loopEmailRepository.delete(id);
    if (!email) throw new NotFoundException(`LoopEmail with id ${id} not found`);
    return email;
  }
}
