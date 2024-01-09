import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types, now } from "mongoose";

@Schema()
export class Premium extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Users" })
  userId: Types.ObjectId;

  @Prop()
  plan: string;

  @Prop()
  endDate: Date;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const PremiumSchema = SchemaFactory.createForClass(Premium);
