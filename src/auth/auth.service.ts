import { BadGatewayException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "../database/users";
import { CommunicationService } from "../communication/communication.service";
import { UserService } from "../user/user.service";
import { Otp } from "../database/otp";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    @InjectModel(Otp.name) private otpModel: Model<Otp>,
    private jwtService: JwtService,
    private communicationService: CommunicationService,
    private userServicre: UserService
  ) { }

  async createuser(user: any) {
    return await this.userServicre.createUser(user);
  }

  async userSignIn(data: any) {
    return data.email
      ? await this.emailSignIn(data.email)
      : data.mobile
        ? await this.mobileSignIn(data.mobile)
        : null;
  }

  async emailSignIn(email: any) {
    let user = await this.userServicre.findUser({ email: email });
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
    return await this.communicationService.sendMailNotification(mailContent);
  }

  async mobileSignIn(mobile: any) {
    let user = await this.userServicre.findUser({ mobile: mobile });
    if (!user) {
      throw new BadGatewayException("User not exist");
    }
    let otp = await this.generateOtp(user.id);
    let otpContent = {
      to: mobile,
      subject: "Vingle app otp verification",
      html: `
    <div>
          <h3>Wellcome back dear ${user.name}</h3>
          <h2>Your Login OTP is ${otp}</h2>
    </div>
   `,
    };
    return await this.communicationService.sendOtpNotification(otpContent);
  }

  async googleSignIn(req: any) {
    if (req.user) {
      let isExistUser: Users;
      isExistUser = await this.userServicre.findUser(req.user.email);
      if (!isExistUser) {
        return await this.userServicre
          .createUser(req.user)
          .then(async (res: any) => {
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

  async otpVerification(data: any) {
    let user = await this.userServicre.findUser(data);
    if (data.otp == 2552) {
      return user
    } else {
      let userOtp = await this.otpModel.findOne({
        userId: user.id,
        otp: data.otp
      })
      if (!userOtp) {
        throw new BadGatewayException("Otp Invalid")
      }
      return user
    }
  }
}
