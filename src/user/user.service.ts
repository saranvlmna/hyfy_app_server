import { BadGatewayException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Images } from "../shared/database/images";
import { Interests } from "../shared/database/interests";
import { Match } from "../shared/database/match";
import { Social } from "../shared/database/social";
import { Users } from "../shared/database/users";

const ObjectID = require("mongodb").ObjectID;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    @InjectModel(Social.name) private socialModel: Model<Social>,
    @InjectModel(Interests.name) private interestsModel: Model<Interests>,
    @InjectModel(Images.name) private imagesModel: Model<Images>,
    @InjectModel(Match.name) private matchModel: Model<Match>
  ) {}

  async findUser(data: any) {
    let filter = data.email
      ? { email: data.email }
      : data.mobile
      ? { mobile: data.mobile }
      : data.userId
      ? { _id: data.userId }
      : null;
    return await this.userModel.findOne(filter);
  }

  async findAll() {
    return await this.userModel.find();
  }

  async editUser(data: any, id: any) {
    return await this.userModel.updateOne({ _id: id }, data);
  }

  async deleteUser(id: any) {
    return this.userModel.deleteOne({ id: id });
  }

  async updateSocialLinks(data: any) {
    data["isSocailUpdated"] = true;
    let existSocialData = await this.socialModel.findOne({
      userId: data.userId,
    });
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

  async updateInterests(data: any) {
    data["isInterestUpdated"] = true;
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

  async updateImages(data: any) {
    data["isImageUpdated"] = true;
    data["userPosts"] = [data.postUrl];
    let existImages = await this.imagesModel.findOne({
      userId: data.userId,
    });
    if (!existImages) {
      return await this.imagesModel.create(data);
    } else {
      return await this.imagesModel.updateOne(
        {
          userId: data.userId,
        },
        {
          $push: {
            userPosts: data.postUrl,
          },
          $set: {
            isImageUpdated: data["isImageUpdated"],
          },
        }
      );
    }
  }

  async getNewFeeds() {
    try {
      return await this.userModel.aggregate([
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
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  async matchPartner(data: any) {
    let isAlredyMatch = await this.matchModel.findOne({
      partnerId: data.partnerId,
      userId: data.userId,
    });
    if (!isAlredyMatch) {
      let isMatch = await this.matchModel.findOne({
        partnerId: data.userId,
        isMatch: false,
      });
      if (isMatch) {
        return await this.matchModel.updateOne(
          {
            _id: isMatch._id,
          },
          { isMatch: true }
        );
      } else {
        return await this.matchModel.create({
          userId: data.userId,
          partnerId: data.partnerId,
        });
      }
    }
    return;
  }

  async updateUser(data: any) {
    return await this.userModel.updateOne(
      {
        _id: data.userId,
      },
      data
    );
  }

  async createUser(data: any) {
    let isExistUser: any;
    isExistUser =
      data.signUpMethod == "mobile"
        ? await this.findUser({ mobile: data.mobile })
        : await this.findUser({ email: data.email });
    if (!isExistUser) {
      return await this.userModel.create(data);
    }
    return isExistUser;
  }

  async getUser(userId: any) {
    return await this.userModel.aggregate([
      {
        $match: {
          _id: new ObjectID(userId),
        },
      },
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
    ]);
  }
}
