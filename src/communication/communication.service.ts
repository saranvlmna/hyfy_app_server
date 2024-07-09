import { Injectable } from "@nestjs/common";
import { MailService } from "./mail.service";
import { SmsService } from "./sms.service";
@Injectable()
export class CommunicationService {
  constructor(
    private mailService: MailService,
    private smsService: SmsService
  ) {}

  async sendMailNotification(data?: any) {
    let testMail = {
      to: "saranvlmna@gmail.com",
      subject: "Congratulations! Wellcome To hyfy app",
    };
    return await this.mailService.sendMail(data ? data : testMail);
  }

  async sendOtpNotification(data?: any) {
    return await this.smsService.sendSms(data);
  }
}
