import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { now, Document } from "mongoose";

export type ChatDocumet = Chat & Document;

@Schema()
export class Chat {
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
