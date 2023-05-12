import { Injectable } from "@nestjs/common";
import { MailService } from "./mail.service";
@Injectable()
export class CommunicationService {
  constructor(private mailService: MailService) {}

  async sendMailNotification(data?: any) {
    let testMail = {
      to: "saranvlmna@gmail.com",
      subject: "Congratulations! Wellcome To letsChat datingApp",
    };
    return await this.mailService.sendMail(data ? data : testMail);
  }

  async sendOtpNotification(data?: any) {
    console.log(data);
  }
}
