import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document } from "mongoose";
import { User } from "src/user/user.entity";

@Schema({ versionKey: false })
export class Task extends Document {

    @Prop({ required: true })
    title: string

    @Prop()
    description: string

    @Prop({ required: true })
    status: string;

    @Prop({ type: Date })
    dueDate: Date

    @Prop({ type: Date, default: Date.now })
    creationDate: Date

    @Prop({ type: Date, default: Date.now })
    lastUpdatedDate: Date

    @Prop([{ text: String, date: { type: Date, default: Date.now } }])
    comments: { text: string; date: Date }[]

    @Prop({ type: mongoose.Types.ObjectId, ref: "User" })
    assignedTo: string;

}

export const TaskSchema = SchemaFactory.createForClass(Task);