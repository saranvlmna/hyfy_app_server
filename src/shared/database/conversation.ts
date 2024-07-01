import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, now } from "mongoose";

@Schema()
export class Conversation extends Document {
  @Prop()
  userId: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
