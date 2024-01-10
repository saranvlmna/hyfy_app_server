import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types, now } from "mongoose";

@Schema()
export class Active extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Users" })
  userId: Types.ObjectId;

  @Prop()
  socketId: string;

  @Prop()
  lastSeen: Date;

  @Prop({ default: now() })
  createdAt: Date;
}

export const ActiveSchema = SchemaFactory.createForClass(Active);
