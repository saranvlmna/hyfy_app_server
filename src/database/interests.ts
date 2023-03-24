import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, now, Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class Interests extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Users" })
  userId: Types.ObjectId;

  @Prop()
  songs: boolean;

  @Prop()
  reels: boolean;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const InterestsSchema = SchemaFactory.createForClass(Interests);
