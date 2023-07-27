import { DeleteTemplateCommandOutput } from "@aws-sdk/client-ses";
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { BilingualEmailTemplate, EmailsService } from "src/emails/emails.service";
import { SubscriptionService } from "src/subscriptions/subscription.service";

@Controller('admin')
export class AdminController {

    constructor(
        private readonly emailsService: EmailsService,
        private readonly subscriptionService: SubscriptionService,
    ) {}

    @Get()
    async checkAdmin() {}

    @Get('send-email-to-all')
    async sendEmailToAll(@Body("templates") template: BilingualEmailTemplate) {
        const subscriptions = await this.subscriptionService.getAll();
        return this.emailsService.sendEmailToAll(template, subscriptions);
    }

    @Post('test-email-template')
    async testEmailTemplate(@Body("destination") destination: string, @Body("emailTemplate") emailTemplate: BilingualEmailTemplate) {
        const frenchResult = await this.emailsService.createAndSendTemplatedEmail([destination], emailTemplate.french);
        const englishResult = await this.emailsService.createAndSendTemplatedEmail([destination], emailTemplate.english);
        return [...frenchResult, ...englishResult];
    }

    @Post('set-welcome-email')
    async setWelcomeEmailTemplate(@Body("emailTemplate") template: BilingualEmailTemplate) {
        console.log("Setting welcome email template");
        try {
            return Promise.all([
                await this.emailsService.setWelcomeEmail(template.french, "french"),
                await this.emailsService.setWelcomeEmail(template.french, "english"),
            ]);
        } catch (e) {
            console.log(e.message);
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('get-welcome-email')
    async getWelcomeEmailTemplate(): Promise<BilingualEmailTemplate> {
        const french = await this.emailsService.getWelcomeEmail("french");
        const english = await this.emailsService.getWelcomeEmail("english");
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

    /** TEMPLATES */

    @Get('templates/:templateName')
    async getTemplate(@Param("templateName") templateName: string) {
        console.log("Getting template " + templateName);
        const french = await this.emailsService.getTemplate(templateName + "-french");
        const english = await this.emailsService.getTemplate(templateName + "-english");
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
    
    @Get('templates')
    async listTemplates() {
        let result = (await this.emailsService.listTemplates()).TemplatesMetadata;
        result = result.filter(template => template.Name.endsWith("-french"));
        result.map(template => template.Name = template.Name.slice(0, -7));
        return result;
    }


    @Post('templates/:templateName')
    async setTemplate(@Param("templateName") templateName: string, @Body("template") template: BilingualEmailTemplate) {
        console.log(template);
        try {
            return Promise.all([
                await this.emailsService.setTemplate(templateName + "-french", template.french),
                await this.emailsService.setTemplate(templateName + "-english", template.english),
            ]);
        } catch (e) {
            console.log(e.message);
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('templates/:templateName')
    async deleteTemplate(@Param("templateName") templateName: string) {
        return Promise.all([
            await this.emailsService.deleteTemplate(templateName + "-french"),
            await this.emailsService.deleteTemplate(templateName + "-english"),
        ]);
    }
}