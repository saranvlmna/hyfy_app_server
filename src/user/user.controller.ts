import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "src/shared/errorhandler";
import { Authguard } from "../shared/authgaurd";
import { UserService } from "./user.service";
const path = require("path");
const dir = path.join(__dirname);

@UseInterceptors(Authguard)
@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private error: errorHandler
  ) {}

  @Get("profile")
  async getUserProfile(@Res() res: any, @Req() req: any) {
    try {
      let userId = req.user.id;
      const users = await this.userService.getUser(userId);
      return res.status(StatusCodes.OK).json({
        message: "Profile fetched successfully",
        data: users,
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @Get("list")
  async listAllUsers(@Res() res: any) {
    try {
      const users = await this.userService.findAll();
      return res.status(StatusCodes.OK).json({
        message: "user fetched successfully",
        data: users,
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @Put("update")
  async updateUser(@Body() body: any, @Res() res: any, @Req() req: any) {
    try {
      body["userId"] = req.user.id;
      const result = await this.userService.updateUser(body);
      return res.status(StatusCodes.OK).json({
        message: "User updated successfully",
        data: result,
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @Put("update/social")
  async updateSocialLinks(@Body() body: any, @Res() res: any, @Req() req: any) {
    try {
      body["userId"] = req.user.id;
      const result = await this.userService.updateSocialLinks(body);
      return res.status(StatusCodes.OK).json({
        message: "Social links added successfully",
        data: result,
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @Put("update/interests")
  async updateInterests(@Body() body: any, @Res() res: any, @Req() req: any) {
    try {
      body["userId"] = req.user.id;
      const result = await this.userService.updateInterests(body);
      return res.status(StatusCodes.OK).json({
        message: "Interests updated successfully",
        data: result,
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @Get("newfeed")
  async getNewFeeds(@Res() res: any) {
    try {
      const users = await this.userService.getNewFeeds();
      return res.status(StatusCodes.OK).json({
        message: "Feeds listed successfully",
        data: users,
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @Delete("delete")
  async deleteUser(@Body() body: any, @Res() res: any) {
    try {
      const result = await this.userService.deleteUser(body.id);
      return res.status(StatusCodes.OK).json({
        message: "user deleted successfully",
        data: result,
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @Post("match")
  async matchPair(@Body() body: any, @Res() res: any, @Req() req: any) {
    try {
      body["userId"] = req.user.id;
      const result = await this.userService.matchPair(body);
      return res.status(StatusCodes.OK).json({
        message: "Parter matched successfully",
        data: result,
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @Get("list/pairs")
  async listPair(@Body() body: any, @Res() res: any, @Req() req: any) {
    try {
      body["userId"] = req.user.id;
      const result = await this.userService.listPair(body);
      return res.status(StatusCodes.OK).json({
        message: "List Pair successfully",
        data: result,
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @Get("list/matches")
  async listMaches(@Body() body: any, @Res() res: any, @Req() req: any) {
    try {
      body["userId"] = req.user.id;
      const result = await this.userService.listMatches(body);
      return res.status(StatusCodes.OK).json({
        message: "List Maches successfully",
        data: result,
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @UseInterceptors(AnyFilesInterceptor())
  // @UseInterceptors(
  //   FilesInterceptor("userPost", 5, {
  //     storage: diskStorage({
  //       destination: dir,
  //       filename: (req, file, callback) => {
  //         const fileExtName = extname(file.originalname);
  //         const randomName = v4();
  //         callback(null, `${randomName}${fileExtName}`);
  //         req.body.path = dir + "/" + `${randomName}${fileExtName}`;
  //       },
  //     }),
  //   })
  // )
  @Put("update/image")
  async updateImages(
    @Body() body: any,
    @Res() res: any,
    @Req() req: any,
    @UploadedFiles() userPost: Array<Express.Multer.File>
  ) {
    try {
      console.log(userPost);
      body["userId"] = req.user.id;
      // body["imageUrl"] = await uploadFile(req.body.path);
      body["imageUrl"] = userPost[0].buffer.toString("base64");
      let result: any;
      if (userPost[0].fieldname == "userPost") {
        result = await this.userService.updatePost(body);
      }
      if (userPost[0].fieldname == "profilePic") {
        result = await this.userService.updateProfilePic(body);
      }
      return res.status(StatusCodes.OK).json({
        message: "Posted successfully",
        data: result,
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }
}
