import { Body, Controller, Get, Post } from "@nestjs/common";
import { MailService } from "./mail.service";

@Controller('emails')
export class EmailsController {
    
    constructor(
        private readonly mailService: MailService,
    ) {}

    @Get('send-email-to-all')
    async sendEmailToAll(@Body("templates") template: BilingualEmailTemplate) {
        return this.mailService.sendEmailToAll(template);
    }

    @Post('test-email-template')
    async testEmailTemplate(@Body("destination") destination: string, @Body("emailTemplate") emailTemplate: BilingualEmailTemplate) {
        const frenchResult = await this.mailService.createAndSendTemplatedEmail([destination], emailTemplate.french);
        const englishResult = await this.mailService.createAndSendTemplatedEmail([destination], emailTemplate.english);
        return [...frenchResult, ...englishResult];
    }

    @Post('set-welcome-email')
    async setWelcomeEmailTemplate(@Body("emailTemplate") template: BilingualEmailTemplate) {
        return Promise.all([
            await this.mailService.setWelcomeEmail(template.french, "french"),
            await this.mailService.setWelcomeEmail(template.french, "english"),
        ]);
    }

    @Get('get-welcome-email')
    async getWelcomeEmailTemplate(): Promise<BilingualEmailTemplate> {
        const french = await this.mailService.getWelcomeEmail("french");
        const english = await this.mailService.getWelcomeEmail("english");
        return {
            french: {
                subject: french.Template.SubjectPart,
                body: french.Template.HtmlPart,
            },
            english: {
                subject: english.Template.SubjectPart,
                body: english.Template.HtmlPart,
            }
        };
    }

}