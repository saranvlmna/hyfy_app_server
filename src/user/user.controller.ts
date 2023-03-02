import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import { StatusCodes } from "http-status-codes";
import { Authguard } from "src/shaerd/authgaurd";
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
}
