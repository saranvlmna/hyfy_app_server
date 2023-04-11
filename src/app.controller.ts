import {
    Controller, Get, Res,
} from "@nestjs/common";
@Controller()
export class AppController {
    constructor() { }

    @Get()
    async hEyBuDdY() {
        return "hey buddy 😌"
    }
}
