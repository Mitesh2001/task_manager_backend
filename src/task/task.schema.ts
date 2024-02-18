import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document } from "mongoose";

@Schema({ versionKey: false })
export class Task extends Document {

    @Prop({ required: true })
    title: string

    @Prop()
    description: string

    @Prop({ required: true })
    status: string;

    @Prop({ type: Date })
    due_date: Date

    @Prop({ type: Date, default: Date.now })
    creationDate: Date

    @Prop({ type: Date, default: Date.now })
    lastUpdatedDate: Date

    @Prop([{ text: String, date: { type: Date, default: Date.now } }])
    comments: { text: string; date: Date }[]

}

export const TaskSchema = SchemaFactory.createForClass(Task);