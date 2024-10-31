import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/entities/user.entity';
import { UserActivity } from '../models/entities/user-activity.entity';
import { CreateUserDto } from '../models/dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserActivity.name) private userActivityModel: Model<UserActivity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return new this.userModel(createUserDto).save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async updateById(id: string, updateData: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async recordActivity(email: string, activity: string) {
    const activityRecord = new this.userActivityModel({ email, activity });
    await activityRecord.save();
  }
}
