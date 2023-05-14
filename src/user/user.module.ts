import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Images, ImagesSchema } from "../shared/database/images";
import { Interests, InterestsSchema } from "../shared/database/interests";
import { Match, MatchSchema } from "../shared/database/match";
import { Social, SocialSchema } from "../shared/database/social";
import { UserSchema, Users } from "../shared/database/users";
import { errorHandler } from "../shared/errorhandler";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UserSchema },
      { name: Social.name, schema: SocialSchema },
      { name: Interests.name, schema: InterestsSchema },
      { name: Images.name, schema: ImagesSchema },
      { name: Match.name, schema: MatchSchema },
    ]),
    JwtModule,
  ],
  providers: [UserService, errorHandler],
  exports: [UserService],
})
export class UserModule {}
