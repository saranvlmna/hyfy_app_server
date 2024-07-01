import { Module } from "@nestjs/common";
import { CommunicationController } from "./communication.controller";
import { CommunicationService } from "./communication.service";
import { MailService } from "./mail.service";
import { SmsService } from "./sms.service";

@Module({
  controllers: [CommunicationController],
  providers: [CommunicationService, MailService,SmsService],
  exports: [CommunicationService],
})
export class CommunicationModule {}
