import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { now, Document } from "mongoose";

export type ImagesDocumet = Images & Document;

@Schema()
export class Images {
  @Prop()
  userId: string;

  @Prop()
  file1: string;

  @Prop()
  file2: string;

  @Prop()
  file3: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const ImagesSchema = SchemaFactory.createForClass(Images);
