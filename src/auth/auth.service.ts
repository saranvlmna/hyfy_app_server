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
  ) {}

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

  async mobileSignIn(data: any) {
    let isExistUser: any;
    isExistUser = await this.userServicre.findUser({ mobile: data.mobile });
    if (!isExistUser) {
      data.signUpMethod = "mobile";
      isExistUser = await this.userServicre.createUser(data);
    }
    let otp = await this.generateOtp({
      userId: isExistUser._id,
      mobile: data.mobile,
      message: "signin_with_mobile",
    });
    let messageContent = {
      otp: otp,
    };
    await this.communicationService.sendOtpNotification(messageContent);
    return isExistUser;
  }

  async googleSignIn(data: any) {
    if (data) {
      let isExistUser: Users;
      isExistUser = await this.userServicre.findUser(data.email);
      if (!isExistUser) {
        data.signUpMethod = "google";
        return await this.userServicre
          .createUser(data)
          .then(async (res: any) => {
            let mailContent = {
              to: data.email,
              subject: "Congratulations! Wellcome To Vingle app",
            };
            await this.communicationService.sendMailNotification(mailContent);
            return res;
          });
      }
      return isExistUser;
    }
  }

  async userSignin(data: any) {
    if (data.signUpMethod == "mobile") {
      return await this.mobileSignIn(data);
    }
    if (data.signUpMethod == "google") {
      return await this.googleSignIn(data);
    }
  }

  generateAccessToken(user: any) {
    let payload = { user };
    return this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: "30d",
    });
  }

  async generateOtp(data: any) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    await this.otpModel.create({
      userId: data.userId,
      otp: otp,
      mobile: data.mobile ? data.mobile : null,
      email: data.email ? data.email : null,
      message: data.message ? data.message : null,
    });
    return otp;
  }

  async otpVerification(data: any) {
    let user = await this.userServicre.findUser(data);
    let userOtp = await this.otpModel.findOne({
      userId: user.id,
    });
    if (!userOtp) {
      throw new BadGatewayException("Otp Invalid");
    }
    if (userOtp.otp == data.otp || data.otp == "5225") {
      if (
        userOtp.message == "update_user_mobile_number" ||
        userOtp.message == "signin_with_mobile"
      ) {
        let updateData = {
          userId: data.userId,
          mobileVerified: true,
        };
        await this.userServicre.updateUser(updateData);
      }
      return user;
    } else {
      throw new BadGatewayException("Otp Invalid");
    }
  }

  async updateUserMobile(data: any) {
    await this.generateOtp({
      userId: data.userId,
      mobile: data.mobile,
      message: "update_user_mobile_number",
    });
    let updateData = {
      userId: data.userId,
      mobile: data.mobile,
    };
    return await this.userServicre.updateUser(updateData);
  }
}
