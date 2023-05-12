import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, now, Document, Schema as MongooseSchema } from "mongoose";

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
