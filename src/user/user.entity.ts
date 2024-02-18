import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ versionKey: false })
export class User extends Document {

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string

}

export const UserSchema = SchemaFactory.createForClass(User);