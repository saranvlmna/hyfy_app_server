import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types, now } from "mongoose";

@Schema()
export class Social extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Users" })
  userId: Types.ObjectId;

  @Prop()
  instagram: string;

  @Prop()
  facebook: string;

  @Prop()
  twitter: string;

  @Prop()
  snapChat: string;

  @Prop()
  spotify: string;

  @Prop({ default: now() })
  isSocailUpdated: boolean;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const SocialSchema = SchemaFactory.createForClass(Social);
