import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class LoopEmail extends Document {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  created_by: string;

  @Prop()
  updated_by?: string;
}

export const LoopEmailSchema = SchemaFactory.createForClass(LoopEmail);
