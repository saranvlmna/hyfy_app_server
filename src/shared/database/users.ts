import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { now, Document } from "mongoose";

@Schema()
export class Users extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop()
  photo: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  opponentGender: string;

  @Prop()
  mobile: number;

  @Prop({ default: false })
  mobileVerified: boolean;

  @Prop()
  location: string;

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
  signUpMethod: string;

  @Prop()
  refreshToken: string;

  @Prop()
  providerId: string;

  @Prop()
  uid: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(Users);
