import { Injectable } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { SesmailService } from './sesmail.service';
import { MailSender } from './mail.interface';

@Injectable()
export class MailService {
    private mailSenderType: MailSender
    constructor(
        private gmailService: GmailService,
        private sesService: SesmailService
    ) { }

    setEmailType(event: string) {
        if (event === 'add') {
            this.mailSenderType = this.gmailService
        }
        else if (event === 'update') {
            this.mailSenderType = this.sesService
        }
        else {
            throw new Error('Invalid event');
        }
    }

    sendMail(to: string, subject: string, content: string) {
        return this.mailSenderType.sendMail(to, subject, content)
    }

}
