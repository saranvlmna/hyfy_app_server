import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "../shared/errorhandler";
import { Authguard } from "src/shared/authgaurd";
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private error: errorHandler
  ) {}

  // @Post("signin/google")
  // async createuser(@Body() body: any, @Res() res: any) {
  //   try {
  //     body.emailVerified = true;
  //     const user = await this.authService.googleSignIn(body);
  //     const accessToken = await this.authService.generateAccessToken(user);
  //     return res.status(StatusCodes.OK).json({
  //       message: "User Created successfully",
  //       data: {
  //         accessToken,
  //       },
  //     });
  //   } catch (error) {
  //     this.error.handle(res, error);
  //   }
  // }

  // @Post("signin/mobile")
  // async mobileSignIn(@Body() body: any, @Res() res: any) {
  //   try {
  //     const user = await this.authService.mobileSignIn(body);
  //     const accessToken = await this.authService.generateAccessToken(user);
  //     return res.status(StatusCodes.OK).json({
  //       message: "User Created successfully",
  //       data: {
  //         accessToken,
  //       },
  //     });
  //   } catch (error) {
  //     this.error.handle(res, error);
  //   }
  // }

  @Post("signin")
  async userSignin(@Body() body: any, @Res() res: any) {
    try {
      const user = await this.authService.userSignin(body);
      const accessToken = await this.authService.generateAccessToken(user);
      return res.status(StatusCodes.OK).json({
        message: "User signin successfully",
        data: {
          accessToken,
        },
      });
    } catch (error) {
      this.error.handle(res, error);
    }
  }

  @UseInterceptors(Authguard)
  @Post("mobile/update")
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
