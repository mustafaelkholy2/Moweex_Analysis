import { Injectable } from '@nestjs/common';
import { MailSender } from './mail.interface';
import { SES } from 'aws-sdk'

@Injectable()
export class SesmailService implements MailSender {

    private ses = new SES()
    sendMail(to: string, subject: string, content: string): Promise<any> {
        const mailData = {
            Source: 'your-email@example.com',
            Destination: { ToAddresses: [to] },
            Message: {
                Subject: { Data: subject },
                Body: { Text: { Data: content } },
            }
        }
        console.log('update product mail')
        return this.ses.sendEmail(mailData).promise();
    }

}
