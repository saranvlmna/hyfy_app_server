import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "../database/users";
import { CommunicationService } from "../communication/communication.service";
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    private jwtService: JwtService,
    private communicationService: CommunicationService
  ) {}

  async findOrCreate(req: any) {
    if (req.user) {
      let isExistUser: Users;
      isExistUser = await this.userModel.findOne({
        email: req.user.email,
      });
      if (!isExistUser) {
        return await this.userModel.create(req.user).then(async (res: any) => {
          let mailContent = {
            to: req.user.email,
            subject: "Congratulations! Wellcome To letsChat datingApp",
          };
          await this.communicationService.sendMailNotification(mailContent);
          return res;
        });
      }
      return isExistUser;
    }
  }

  generateAuthToken(user: Users) {
    let payload = { user };
    return this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: "1h",
    });
  }

  generateRefreshToken(userId: any) {
    let payload = { userId };
    return this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: "30d",
    });
  }
}
