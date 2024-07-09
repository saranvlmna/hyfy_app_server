import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Active } from "../shared/database/activeuser";
import { Conversation } from "../shared/database/conversation";
@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Active.name) private activeModel: Model<Active>,
    @InjectModel(Conversation.name)
    private ConversationModel: Model<Conversation>
  ) {}

  async onlineUser(data: any) {
    const { userId, socketId } = data;
    let isExist = await this.activeModel.findOne({
      userId: userId,
    });
    if (!isExist) {
      return this.activeModel.create({
        userId: userId,
        socketId: socketId,
        lastSeen: new Date(),
      });
    }
    return this.activeModel.updateOne(
      {
        userId: userId,
      },
      { socketId: socketId, lastSeen: new Date() }
    );
  }

  async offlineUser(data: any) {
    const { userId, socketId } = data;
    let isExist = await this.activeModel.findOne({
      userId: userId,
    });
    if (!isExist) {
      return;
    }
    return this.activeModel.updateOne(
      {
        userId: userId,
      },
      { socketId: "", lastSeen: new Date() }
    );
  }

  async checkUserOnline(userId: any) {
    return await this.activeModel.findOne({
      userId: userId,
    });
  }

  async saveMessage(data: any) {
    return await this.ConversationModel.create(data);
  }
}
