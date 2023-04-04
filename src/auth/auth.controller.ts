import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "../shared/errorhandler";
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private error: errorHandler
  ) {}

  @Post("user/google/signin")
  async createuser(@Body() body: any, @Res() res: any) {
    try {
      const user = await this.authService.googleSignIn(body);
      const accessToken = await this.authService.generateAccessToken(user);
      return res.status(StatusCodes.OK).json({
        message: "User Created successfully",
        data: {
          accessToken,
        },
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @Post("signin")
  async userSignIn(@Body() body: any, @Res() res: any) {
    try {
      const result = await this.authService.userSignIn(body);
      return res.status(StatusCodes.OK).json({
        message: "Otp send successfully",
        data: result,
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @Post("otp/verify")
  async otpVerification(@Body() body: any, @Res() res: any) {
    try {
      const result = await this.authService.otpVerification(body);
      return res.status(StatusCodes.OK).json({
        message: "Otp Verify successfully",
        data: result,
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req: any) {}

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req: any, @Res() res: any) {
    try {
      const user = await this.authService.googleSignIn(req);
      const accessToken = await this.authService.generateAccessToken(user);
      return res.status(StatusCodes.OK).json({
        message: "User login successfully",
        data: {
          accessToken,
        },
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }
}
