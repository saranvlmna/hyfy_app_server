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

  @Post("signin/email")
  async emailSignIn(@Body() body: any, @Res() res: any) {
    try {
      const result = await this.authService.emailSignIn(body.email);
      return res.status(StatusCodes.OK).json({
        message: "Email otp sent successfully",
        data: result,
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @Post("signin/mobile")
  async mobileSignIn(@Body() body: any, @Res() res: any) {
    try {
      const result = await this.authService.mobileSignIn(body.mobile);
      return res.status(StatusCodes.OK).json({
        message: "mobile otp sent successfully",
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
      const accessToken = await this.authService.generateRefreshToken(user);
      const refreshtoken = await this.authService.generateAuthToken(
        user["_id"]
      );
      return res.status(StatusCodes.OK).json({
        message: "User login successfully",
        data: {
          accessToken,
          refreshtoken,
        },
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }
}
