import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ChatModule } from "./chat/chat.module";
import { ChatGateway } from "./chatRoom";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { personalChat } from "./personalChat";
import { CommunicationModule } from "./communication/communication.module";
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
})
export class AppModule {}
