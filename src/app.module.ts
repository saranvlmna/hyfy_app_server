import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ChatModule } from "./chat/chat.module";
import { ChatGateway } from "./chatRoom";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ChatModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
  ],
  providers: [ChatGateway],
})
export class AppModule {}
