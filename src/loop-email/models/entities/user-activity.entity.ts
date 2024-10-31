import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created_at' } })
export class UserActivity extends Document {
  @Prop({ required: true })
  activity: string;

  @Prop({ required: true })
  email: string;
}

export const UserActivitySchema = SchemaFactory.createForClass(UserActivity);
