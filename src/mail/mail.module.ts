import { Module } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { SesmailService } from './sesmail.service';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                service: 'gmail',
                auth: {
                    user: 'user@gmail.com',
                    password: 'userPassword'
                }
            }
        })
    ],
    providers: [GmailService, SesmailService, MailService],
    exports: [MailService]
})
export class MailModule { }
