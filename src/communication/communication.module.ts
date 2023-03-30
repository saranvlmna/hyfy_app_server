import { Module } from "@nestjs/common";
import { CommunicationService } from "./communication.service";
import { CommunicationController } from "./communication.controller";
import { MailService } from "./mail.service";

@Module({
  controllers: [CommunicationController],
  providers: [CommunicationService, MailService],
  exports: [CommunicationService],
})
export class CommunicationModule {}
