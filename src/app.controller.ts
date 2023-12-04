import { Controller, Get, Res } from "@nestjs/common";
import { StatusCodes } from "http-status-codes";
@Controller()
export class AuthController {
  constructor() {}

  @Get()
  async hyFy(@Res() res: any) {
    console.log("hey hyFy");
    return res.status(StatusCodes.OK).json({
      message: "hey hyFy",
    });
  }
}
