import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Pair } from "../shared/database/pairUser";
import { Images } from "../shared/database/image";
import { Interests } from "../shared/database/interest";
import { Match } from "../shared/database/match";
import { Social } from "../shared/database/social";
import { Users } from "../shared/database/user";

const ObjectID = require("mongodb").ObjectID;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    @InjectModel(Social.name) private socialModel: Model<Social>,
    @InjectModel(Interests.name) private interestsModel: Model<Interests>,
    @InjectModel(Images.name) private imagesModel: Model<Images>,
    @InjectModel(Match.name) private matchModel: Model<Match>,
    @InjectModel(Pair.name) private pairModel: Model<Pair>
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

  async updatePost(data: any) {
    data["isImageUpdated"] = true;
    data["userPosts"] = [data.imageUrl];
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
            userPosts: data.imageUrl,
          },
          $set: {
            isImageUpdated: data["isImageUpdated"],
          },
        }
      );
    }
  }

  async updateProfilePic(data: any) {
    return await this.userModel.updateOne(
      {
        _id: data.userId,
      },
      {
        photo: data.imageUrl,
      }
    );
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
    let isPair = await this.pairModel.findOne({
      userId: data.userId,
      partnerId: data.partnerId,
    });
    if (!isPair) {
      let isMatch = await this.matchModel.findOne({
        userId: data.partnerId,
        partnerId: data.userId,
        isMatch: false,
      });
      if (isMatch) {
        await this.matchModel.updateOne(
          {
            _id: isMatch._id,
          },
          { isMatch: true }
        );
        await this.pairModel.create({
          userId: data.userId,
          partnerId: data.partnerId,
        });
        return await this.pairModel.create({
          userId: data.partnerId,
          partnerId: data.userId,
        });
      } else {
        let isSame = await this.matchModel.findOne({
          isMatch: false,
          partnerId: data.partnerId,
          userId: data.userId,
        });
        if (!isSame) {
          return await this.matchModel.create({
            userId: data.userId,
            partnerId: data.partnerId,
          });
        } else {
          return "Already Matched";
        }
      }
    }
    return "Already Paird";
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
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  async listMaches(data: any) {
    return await this.pairModel.aggregate([
      {
        $match: {
          userId: new ObjectID(data.userId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "partnerId",
          foreignField: "_id",
          as: "maches",
        },
      },
    ]);
  }
}
