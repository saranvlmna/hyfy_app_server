import {
  Body,
  Controller,
  Post,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginDto, signupDto } from "../shared/dto";
import { StatusCodes } from "http-status-codes";


@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signup(@Body() body: signupDto, @Res() res: any) {
    const user = await this.authService.createUser(body);
    return res.status(StatusCodes.OK).json({
      message: "user successfuly created",
      data: user,
    });
  }

  @Post("login")
  async signin(@Body() body: loginDto, @Res() res: any) {
    const user = await this.authService.loginUser(body);
    return res.status(StatusCodes.OK).json({
      message: "user successfully login",
      data: user,
    });
  }
}
