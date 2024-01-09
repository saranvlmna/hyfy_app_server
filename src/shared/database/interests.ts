import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, now, Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class Interests extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Users" })
  userId: Types.ObjectId;

  @Prop({ default: false })
  male:boolean

  @Prop({ default: false })
  female:boolean

  @Prop({ default: false })
  football:boolean

  @Prop({ default: false })
  cricket:boolean

  @Prop({ default: false })
  isInterestUpdated: boolean;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const InterestsSchema = SchemaFactory.createForClass(Interests);
