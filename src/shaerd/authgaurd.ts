import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Observable } from "rxjs";
import { Users } from "src/database/users";
@Injectable()
export class Authguard implements NestInterceptor {
  constructor(
    private readonly jwt: JwtService,
    @InjectModel(Users.name) private userModel: Model<Users>
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();
    const headers = request["headers"];
    if (!headers["token"] || headers["token"].trim().length == 0) {
      response.status(401);
      return response.json({ message: "unauthorized" });
    }
    const authToken = headers["token"];
    let decoded: any;
    try {
      decoded = this.jwt.decode(authToken);
    } catch (e) {
      response.status(401).json({ message: "unauthorised" });
    }
    if (!decoded) response.status(401).json({ message: "unauthorised" });
    const user = await this.userModel.findOne({ id: decoded._id });
    request["user"] = user;
    return next.handle();
  }
}
