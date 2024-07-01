import { Injectable } from "@nestjs/common";
const accountSid = 'AC2fa38fd1dcbbec2717012e284825aeb0';
const authToken = '558e48ac0c1c82884e7f1329cd62aba2';
const client = require('twilio')(accountSid, authToken);
@Injectable()
export class SmsService {
  async sendSms(smdContent: any) {

    //  let message=await client.messages
    //     .create(
    //         {
    //             from: '+18146663915',
    //             to: '+919526925448',
    //             body: `hyfy login OTP - ${smdContent.otp}`,
    //         }
    //     )
        
    //     return message
  }
}

