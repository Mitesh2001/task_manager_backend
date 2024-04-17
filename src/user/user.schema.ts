import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Task } from "src/task/task.schema";

@Schema({ versionKey: false, timestamps: true })
export class User extends Document {

    @Prop({ required: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: "Task" }] })
    tasks: Task[]

}

export const UserSchema = SchemaFactory.createForClass(User);