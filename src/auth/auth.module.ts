import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Users, UserSchema } from "../database/users";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { GoogleStrategy } from "./auth.googleservice";
import { CommunicationModule } from "../communication/communication.module";

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    JwtModule,
    CommunicationModule
  ],
  providers: [AuthService,GoogleStrategy],
})
export class AuthModule {}
