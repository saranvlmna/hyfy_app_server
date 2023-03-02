import {
  BadGatewayException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User, UserDocumet, UserSchema } from "../database/user";
import { genSalt, hash, compare } from "bcrypt";
import { Tokens } from "src/types/token";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

const otpGenerator = require("otp-generator");

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocumet>,
    private jwtService: JwtService
  ) {}

  async createUser(data: any): Promise<Tokens> {
    const salt = await genSalt(10);
    data.password = await hash(data.password, salt);
    const user = await this.userModel.create(data);
    const token = await this.generateAuthToken(user.id, user.email);
    await this.updateUserRToken(user, token.refresh_token);
    return token;
  }

  async loginUser(data: any) {
    let existingUser;
    existingUser = await this.userModel.findOne({
      where: {
        email: data.email,
      },
    });
    if (!existingUser) {
      throw new NotFoundException("User does not exist");
    }
    let isValid = await compare(data.password, existingUser.password);
    if (!isValid) {
      throw new BadGatewayException("Password is Invalid");
    } else {
      const otp = otpGenerator.generate(4, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true,
      });
      existingUser.access_token = await this.generateAccesToken(
        existingUser.id,
        existingUser.rToken
      );
      const token = await this.generateAuthToken(
        existingUser.id,
        existingUser.email
      );
      await this.updateUserRToken(existingUser, token.refresh_token);
      return token;
    }
  }

  async generateAuthToken(userId: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        {
          secret: "vlmna",
          expiresIn: 60 * 15,
        }
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        {
          secret: "vlmnart",
          expiresIn: 60 * 60 * 24 * 7,
        }
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async generateAccesToken(userId: number, rt: string) {
    const user = await this.userModel.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ForbiddenException("Access Denided");
    }
    if (rt !== user.rToken) {
      throw new ForbiddenException("Access Denided !!");
    }
    const token = await this.generateAuthToken(user.id, user.email);
    await this.updateUserRToken(user.id, token.refresh_token);
    return token;
  }

  async updateUserRToken(userId: any, rt: string) {
    const salt = await genSalt(10);
    const hashrt = await hash(rt, salt);
    await this.userModel.updateOne({ _id: userId }, { $set: { rt: hashrt } });
  }
}
