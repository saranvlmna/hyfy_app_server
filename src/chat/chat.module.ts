import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Conversation,
  ConversationSchema,
} from "src/shared/database/conversation";
import { Active, ActiveSchema } from "../shared/database/activeuser";
import { ChatService } from "./chat.service";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Active.name, schema: ActiveSchema },
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
