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
import { errorHandler } from "src/shared/errorhandler";
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private error: errorHandler
  ) {}

  @Get()
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req: any) {}

  @Get("callback")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req: any, @Res() res: any) {
    const user = await this.authService.findOrCreate(req);
    const accessToken = await this.authService.generateRefreshToken(user);
    const refreshtoken = await this.authService.generateAuthToken(user["_id"]);
    return res.status(StatusCodes.OK).json({
      message: "User login successfully",
      data: {
        accessToken,
        refreshtoken,
      },
    });
  }

  @Post("/email")
  async emailSignIn(@Body() body: any, @Res() res: any) {
    try {
      const result = await this.authService.emailSignIn(body.email);
      return result;
    } catch (error) {
      this.error.handle(res, error);
    }
  }
}
