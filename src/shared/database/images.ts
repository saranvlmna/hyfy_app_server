import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types, now } from "mongoose";

@Schema()
export class Images extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Users" })
  userId: Types.ObjectId;

  @Prop()
  userPosts: Array<string>;

  @Prop({ default: false })
  isImageUpdated: boolean;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const ImagesSchema = SchemaFactory.createForClass(Images);
