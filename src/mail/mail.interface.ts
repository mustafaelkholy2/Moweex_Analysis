export interface MailSender {
    sendMail(to: string, subject: string, content: string): Promise<any>;
}