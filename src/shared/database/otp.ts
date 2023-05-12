import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { now, Document } from "mongoose";

@Schema()
export class Otp extends Document {
  @Prop()
  userId: string;

  @Prop()
  otp: string;

  @Prop()
  mobile: string;

  @Prop()
  email: string;

  @Prop()
  message: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
