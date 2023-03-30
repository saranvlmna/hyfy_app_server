import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import { StatusCodes } from "http-status-codes";
import { Authguard } from "src/shared/authgaurd";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(Authguard)
  @Get("list")
  async listAllUsers(@Res() res: any) {
    const users = await this.userService.findAll();
    return res.status(StatusCodes.OK).json({
      message: "user fetched successfully",
      data: users,
    });
  }

  @UseInterceptors(Authguard)
  @Get("newfeed")
  async getNewFeeds(@Res() res: any) {
    const users = await this.userService.getNewFeeds();
    return res.status(StatusCodes.OK).json({
      message: "Feeds listed successfully",
      data: users,
    });
  }

  @UseInterceptors(Authguard)
  @Put("edit")
  async editUser(@Body() body: any, @Res() res: any) {
    const result = await this.userService.editUser(body, body.id);
    return res.status(StatusCodes.OK).json({
      message: "user edited sucessfully",
      data: result,
    });
  }

  @UseInterceptors(Authguard)
  @Delete("delete")
  async deleteUser(@Body() body: any, @Res() res: any) {
    const result = await this.userService.deleteUser(body.id);
    return res.status(StatusCodes.OK).json({
      message: "user deleted successfully",
      data: result,
    });
  }

  @UseInterceptors(Authguard)
  @Post("update/social")
  async updateSocialLinks(@Body() body: any, @Res() res: any, @Req() req: any) {
    body["userId"] = req.user.id;
    const result = await this.userService.updateSocialLinks(body);
    return res.status(StatusCodes.OK).json({
      message: "Social links added successfully",
      data: result,
    });
  }

  @UseInterceptors(Authguard)
  @Post("update/interests")
  async updateInterests(@Body() body: any, @Res() res: any, @Req() req: any) {
    body["userId"] = req.user.id;
    const result = await this.userService.updateInterests(body);
    return res.status(StatusCodes.OK).json({
      message: "Interests updated successfully",
      data: result,
    });
  }

  @UseInterceptors(Authguard)
  @Post("update/images")
  async updateImages(@Body() body: any, @Res() res: any, @Req() req: any) {
    body["userId"] = req.user.id;
    const result = await this.userService.updateImages(body);
    return res.status(StatusCodes.OK).json({
      message: "Images updated successfully",
      data: result,
    });
  }

  @UseInterceptors(Authguard)
  @Post("match")
  async matchPartner(@Body() body: any, @Res() res: any, @Req() req: any) {
    body["userId"] = req.user.id;
    const result = await this.userService.matchPartner(body);
    return res.status(StatusCodes.OK).json({
      message: "Parter matched successfully",
      data: result,
    });
  }
}
