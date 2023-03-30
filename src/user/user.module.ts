import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Images } from "../database/images";
import { ImagesSchema } from "../database/images";
import { Interests, InterestsSchema } from "../database/interests";
import { Match, MatchSchema } from "../database/match";
import { Social, SocialSchema } from "../database/social";
import { Users, UserSchema } from "../database/users";
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
  providers: [UserService],
})
export class UserModule {}
