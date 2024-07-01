import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, now } from "mongoose";

@Schema()
export class ConversationMembers extends Document {
  @Prop()
  userId: string;

  @Prop()
  conversationId: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const ConversationMembersSchema =
  SchemaFactory.createForClass(ConversationMembers);
