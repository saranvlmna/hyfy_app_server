import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types, now } from "mongoose";

@Schema()
export class Message extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Users" })
  senderId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Users" })
  reciverId: Types.ObjectId;

  @Prop()
  message: string;

  @Prop({ default: false })
  isSend: Boolean;

  @Prop()
  sendTime: Date;

  @Prop()
  reciveTime: Date;

  @Prop()
  seenTime: Date;

  @Prop({ default: now() })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
