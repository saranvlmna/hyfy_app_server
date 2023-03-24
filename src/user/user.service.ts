import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Images } from "src/database/images";
import { Interests } from "src/database/interests";
import { Social } from "src/database/social";
import { Users } from "src/database/users";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    @InjectModel(Social.name) private socialModel: Model<Social>,
    @InjectModel(Interests.name) private interestsModel: Model<Interests>,
    @InjectModel(Images.name) private imagesModel: Model<Images>
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
    try {
      let data = await this.userModel.aggregate([
        {
          $lookup: {
            from: "images",
            localField: "_id",
            foreignField: "userId",
            as: "images",
          },
        },
        {
          $lookup: {
            from: "interests",
            localField: "_id",
            foreignField: "userId",
            as: "Interests",
          },
        },
        {
          $lookup: {
            from: "socials",
            localField: "_id",
            foreignField: "userId",
            as: "socials",
          },
        },
        {
          $lookup: {
            from: "premiums",
            localField: "_id",
            foreignField: "userId",
            as: "premiums",
          },
        },
        
      ])
      console.log(JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }
}
