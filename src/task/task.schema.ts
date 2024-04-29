import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document } from 'mongoose';

export enum TaskStatus {
  TO_DO = 'To do',
  IN_PROGRSS = 'In Progress',
  COMPLETED = 'Completed',
}

@Schema({ versionKey: false, timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true, enum: TaskStatus })
  status: string;

  @Prop({ type: Date })
  dueDate: Date;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  assignedTo: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
