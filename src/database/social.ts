import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { now, Document } from "mongoose";

export type SocialDocumet = Social & Document;

@Schema()
export class Social {
  @Prop()
  userId: string;

  @Prop()
  instagram: string;

  @Prop()
  facebook: string;

  @Prop()
  twitter: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const SocialSchema = SchemaFactory.createForClass(Social);
