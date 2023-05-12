import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, now, Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class Images extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Users" })
  userId: Types.ObjectId;

  @Prop()
  posts: Array<string>;

  @Prop({ default: false })
  isImageUpdated: boolean;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const ImagesSchema = SchemaFactory.createForClass(Images);
