import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import { StatusCodes } from "http-status-codes";
import { Authguard } from "src/shared/authgaurd";
import { errorHandler } from "../shared/errorhandler";
import { AuthService } from "./auth.service";
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private error: errorHandler
  ) {}

  @Post("signin")
  async userSignin(@Body() body: any, @Res() res: any) {
    try {
      const user = await this.authService.userSignin(body);
      const accessToken = await this.authService.generateAccessToken(user);
      return res.status(StatusCodes.OK).json({
        message: "User signin successfully",
        data: {
          accessToken,
          user: user,
        },
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @UseInterceptors(Authguard)
  @Put("mobile/update")
  async mobileVerification(
    @Body() body: any,
    @Res() res: any,
    @Req() req: any
  ) {
    try {
      body["userId"] = req.user._id;
      const result = await this.authService.updateUserMobile(body);
      return res.status(StatusCodes.OK).json({
        message: "Mobile otp send successfully",
        data: result,
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @UseInterceptors(Authguard)
  @Put("email/update")
  async emailVerification(@Body() body: any, @Res() res: any, @Req() req: any) {
    try {
      body["userId"] = req.user._id;
      const result = await this.authService.updateUserEmail(body);
      return res.status(StatusCodes.OK).json({
        message: "Email otp send successfully",
        data: result,
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @UseInterceptors(Authguard)
  @Post("otp/verify")
  async otpVerification(@Body() body: any, @Res() res: any, @Req() req: any) {
    try {
      body["userId"] = req.user._id;
      const result = await this.authService.otpVerification(body);
      return res.status(StatusCodes.OK).json({
        message: "Otp Verify successfully",
        data: result,
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }
}
