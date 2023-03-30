import { Injectable } from "@nestjs/common";
import { createTransport } from "nodemailer";
@Injectable()
export class MailService {
  sendMail(mailOptions: any) {
    let transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    return transport.sendMail(mailOptions);
  }
}
