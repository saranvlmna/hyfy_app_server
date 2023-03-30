import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { now, Document } from "mongoose";

@Schema()
export class Users extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  mobile: number;

  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop()
  height: string;

  @Prop()
  weight: string;

  @Prop()
  shortAbout: string;

  @Prop()
  languages: Array<string>;

  @Prop({ default: false })
  isPremium: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  password: string;

  @Prop()
  rToken: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(Users);
