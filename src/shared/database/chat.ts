import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, now } from "mongoose";

@Schema()
export class Chat extends Document {
  @Prop()
  userId: string;

  @Prop()
  conversationId: string;

  @Prop()
  message: string;

  @Prop({ default: false })
  isSend: Boolean;

  @Prop()
  sendTime: Date;

  @Prop({ default: false })
  isRecived: Boolean;

  @Prop()
  recivedTime: Date;

  @Prop()
  isSeen: Date;

  @Prop()
  seenTime: Date;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
