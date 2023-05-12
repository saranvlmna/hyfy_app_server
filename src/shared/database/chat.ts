import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { now, Document } from "mongoose";

@Schema()
export class Chat extends Document {
  @Prop()
  userId: string;

  @Prop()
  senderId: string;

  @Prop()
  receiverId: string;

  @Prop()
  message: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
