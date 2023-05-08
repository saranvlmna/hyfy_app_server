import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, now, Document, Schema as MongooseSchema } from "mongoose";

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
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const SocialSchema = SchemaFactory.createForClass(Social);
