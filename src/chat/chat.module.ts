import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "src/shared/database/messages";
import { Active, ActiveSchema } from "../shared/database/activeusers";
import { ChatService } from "./chat.service";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Active.name, schema: ActiveSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
