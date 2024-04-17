import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document } from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Task extends Document {

    @Prop({ required: true })
    title: string

    @Prop()
    description: string

    @Prop({ required: true })
    status: string;

    @Prop({ type: Date })
    dueDate: Date

    @Prop({ type: mongoose.Types.ObjectId, ref: "User" })
    assignedTo: string;

}

export const TaskSchema = SchemaFactory.createForClass(Task);