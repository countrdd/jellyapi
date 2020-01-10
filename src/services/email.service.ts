import {SentMessageInfo} from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');
const params = {
  "type": "smtp",
    "host": "smtp.gmail.com",
    "secure": true,
    "port": 465,
    "tls": {
    "rejectUnauthorized": false
  },
  "auth": {
    "user": "countrdd@gmail.com",
      "pass": "lad1224$"
  }
}

const nodemailer = require("nodemailer");

export class MailerService {
  async sendMail(mailOptions: Mail.Options): Promise<SentMessageInfo> {
    const transporter = nodemailer.createTransport(params);
    return await transporter.sendMail(mailOptions);
  }
}
