import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { ChatModule } from "./chat/chat.module";
import { ChatGateway } from "./chat/chatRoom";
import { personalChat } from "./chat/personalChat";
import { CommunicationModule } from "./communication/communication.module";
import { UserModule } from "./user/user.module";
@Module({
  imports: [
    ConfigModule.forRoot(),
    ChatModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    UserModule,
    CommunicationModule,
  ],
  providers: [ChatGateway, personalChat],
  controllers: [],
})
export class AppModule {}
