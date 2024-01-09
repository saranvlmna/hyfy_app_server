import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { CommunicationModule } from "../communication/communication.module";
import { Otp, OtpSchema } from "../shared/database/otp";
import { Users, UserSchema } from "../shared/database/users";
import { errorHandler } from "../shared/errorhandler";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { GoogleStrategy } from "./auth.googleservice";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UserSchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
    JwtModule,
    CommunicationModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, errorHandler],
  exports: [AuthService],
})
export class AuthModule {}
