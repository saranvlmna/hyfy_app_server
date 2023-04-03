import { BadGatewayException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "../database/users";
import { CommunicationService } from "../communication/communication.service";
import { UserService } from "src/user/user.service";
import { Otp } from "src/database/otp";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    @InjectModel(Otp.name) private otpModel: Model<Otp>,
    private jwtService: JwtService,
    private communicationService: CommunicationService,
    private userServicre: UserService
  ) { }

  async findOrCreate(req: any) {
    if (req.user) {
      let isExistUser: Users;
      isExistUser = await this.userServicre.findUser(req.user.email);
      if (!isExistUser) {
        return await this.userModel.create(req.user).then(async (res: any) => {
          let mailContent = {
            to: req.user.email,
            subject: "Congratulations! Wellcome To Vingle app",
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

  async emailSignIn(email: any) {
    let user = await this.userServicre.findUser(email);
    if (!user) {
      throw new BadGatewayException("User not exist");
    }
    let otp = await this.generateOtp(user.id);
    let mailContent = {
      to: email,
      subject: "Vingle app email verification",
      html: `
    <div>
          <h3>Wellcome back dear ${user.name}</h3>
          <h2>Your Login OTP is ${otp}</h2>
    </div>
   `,
    };
    await this.communicationService.sendMailNotification(mailContent);
  }

  async generateOtp(userId: string) {
    const newOtp = Math.floor(100000 + Math.random() * 900000);
    const userOtps = await this.otpModel.findOne({ userId: userId });
    if (!userOtps) {
      await this.otpModel.create({
        userId: userId,
        otp: newOtp,
      });
    } else {
      await this.otpModel.updateOne(
        { _id: userOtps.id },
        {
          otp: newOtp,
        }
      );
    }
    return newOtp;
  }
}
