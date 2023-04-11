import {
    Controller, Get, Res,
} from "@nestjs/common";
@Controller()
export class appController {
    constructor() { }

    @Get()
    async hEyBuDdY() {
        return "hey buddy 😌"
    }
}
