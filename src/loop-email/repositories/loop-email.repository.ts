import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoopEmail } from '../models/entities/loop-email.entity';
import { CreateLoopEmailDto } from '../models/dto/create-loop-email.dto';
import { UpdateLoopEmailDto } from '../models/dto/update-loop-email.dto';

@Injectable()
export class LoopEmailRepository {
  constructor(@InjectModel(LoopEmail.name) private loopEmailModel: Model<LoopEmail>) {}

  async create(createLoopEmailDto: CreateLoopEmailDto): Promise<LoopEmail> {
    const createdLoopEmail = new this.loopEmailModel(createLoopEmailDto);
    return createdLoopEmail.save();
  }

  async findAll(month: string): Promise<LoopEmail[]> {
    const [year, monthValue] = month.split('-').map(Number);
  
    const filter = {
      date: {
        $gte: new Date(year, monthValue - 1, 1),
        $lt: new Date(year, monthValue, 1),
      },
    };

   return this.loopEmailModel.find(filter).exec();
  }

  async findById(id: string): Promise<LoopEmail | null> {
    return this.loopEmailModel.findById(id).exec();
  }

  async update(id: string, updateLoopEmailDto: UpdateLoopEmailDto): Promise<LoopEmail | null> {
    return this.loopEmailModel.findByIdAndUpdate(id, updateLoopEmailDto, { new: true }).exec();
  }

  async delete(id: string): Promise<LoopEmail | null> {
    return this.loopEmailModel.findByIdAndDelete(id).exec();
  }
}
