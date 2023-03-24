import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Images, ImagesDocumet } from "src/database/images";
import { Interests } from "src/database/interests";
import { Social, SocialDocumet } from "src/database/social";
import { User, UserDocumet } from "src/database/user";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocumet>,
    @InjectModel(Social.name) private socialModel: Model<SocialDocumet>,
    @InjectModel(Interests.name) private interestsModel: Model<SocialDocumet>,
    @InjectModel(Images.name) private imagesModel: Model<ImagesDocumet>
  ) {}

  async findAll() {
    return await this.userModel.find();
  }

  async editUser(data: any, id: any) {
    return await this.userModel.updateOne({ _id: id }, data);
  }

  async deleteUser(id: any) {
    return this.userModel.deleteOne({ id: id });
  }

  async updateSocialLinks(data) {
    let existSocialData = await this.socialModel.findOne({
      userId: data.userId,
    });
    console.log(existSocialData);

    if (!existSocialData) {
      return await this.socialModel.create(data);
    } else {
      return await this.socialModel.updateOne(
        {
          userId: data.userId,
        },
        data
      );
    }
  }

  async updateInterests(data) {
    let existInterests = await this.interestsModel.findOne({
      userId: data.userId,
    });
    if (!existInterests) {
      return await this.interestsModel.create(data);
    } else {
      return await this.interestsModel.updateOne(
        {
          userId: data.userId,
        },
        data
      );
    }
  }

  async updateImages(data) {
    let existInterests = await this.imagesModel.findOne({
      userId: data.userId,
    });
    if (!existInterests) {
      return await this.imagesModel.create(data);
    } else {
      return await this.imagesModel.updateOne(
        {
          userId: data.userId,
        },
        data
      );
    }
  }

  async getNewFeeds() {
    let data = await this.userModel.find().populate({
      path: "Images",
      // populate: {
      //   path: "comments"
      // }
    });
    console.log(data);
  }
}
