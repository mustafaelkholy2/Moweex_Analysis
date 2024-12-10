import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailSender } from './mail.interface';

@Injectable()
export class GmailService implements MailSender {
    constructor(private mailerSerice: MailerService) { }
    async sendMail(to: string, subject: string, content: string): Promise<any> {
        console.log('Add product mail')
        return this.mailerSerice.sendMail({
            to,
            subject,
            text: content,
        })
    }
}
