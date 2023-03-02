import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginDto, signupDto } from "../dto";
import { StatusCodes } from "http-status-codes";
import { Tokens } from "src/types/token";
import { AuthGuard } from "@nestjs/passport";
import { Authguard } from "src/shaerd/authgaurd";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signup(@Body() body: signupDto, @Res() res: any): Promise<Tokens> {
    const user = await this.authService.createUser(body);
    return res.status(StatusCodes.OK).json({
      message: "user successfuly created",
      data: user,
    });
  }

  @Post("login")
  async signin(@Body() body: loginDto, @Res() res: any): Promise<Tokens> {
    const user = await this.authService.loginUser(body);
    return res.status(StatusCodes.OK).json({
      message: "user successfully login",
      data: user,
    });
  }
}
