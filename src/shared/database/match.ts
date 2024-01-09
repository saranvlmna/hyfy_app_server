import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types, now } from "mongoose";

@Schema()
export class Match extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Users" })
  userId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Users" })
  partnerId: Types.ObjectId;

  @Prop({ default: false })
  isMatch: boolean;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
