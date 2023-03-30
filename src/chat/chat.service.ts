import { BadGatewayException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Active } from "../database/liveuser";

@Injectable()
export class ChatService {
  constructor(@InjectModel(Active.name) private liveModel: Model<Active>) {}

  async newUser(userName: any) {
    let isExist = await this.liveModel.findOne({ userName });
    if (!isExist) {
      return this.liveModel.create({
        userName,
      });
    }
    throw new BadGatewayException("User alredy exist");
  }

  async offlineUser(userName: any) {
    return this.liveModel.deleteOne({ userName });
  }

  async findOnlineUser() {
    return this.liveModel.find();
  }
}
