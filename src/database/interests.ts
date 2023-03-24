import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { now, Document } from "mongoose";

export type InterestsDocumet = Interests & Document;

@Schema()
export class Interests {
  @Prop()
  userId: string;

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
