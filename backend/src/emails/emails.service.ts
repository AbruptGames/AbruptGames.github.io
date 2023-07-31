import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { BulkEmailDestination, CreateTemplateCommandOutput, GetTemplateCommandOutput, SES, SendBulkTemplatedEmailCommandInput, UpdateTemplateCommandOutput } from "@aws-sdk/client-ses";
import { Subscription } from '../subscriptions/subscription.entity';
import { GameKeyService } from './gameKey.service';

export interface BilingualEmailTemplate {
    french: EmailTemplate;
    english: EmailTemplate;
}

export interface EmailTemplate {
    subject: string;
    body: string;
}

@Injectable()
export class EmailsService {
    private readonly ses: SES;
    private readonly source: string = 'abrupt.game@gmail.com';

    constructor(
        private readonly gameKeyService: GameKeyService,
    ) {
        this.ses = new SES({
            region: "eu-west-3",
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID,
                secretAccessKey: process.env.SECRET_ACCESS_KEY,
            }
        });
    }

    private getTemplateName(language: 'english' | 'french'): string {
        return "welcome-template-" + language;
    }

    async getWelcomeEmail(language: 'english' | 'french'): Promise<GetTemplateCommandOutput> {
        return this.ses.getTemplate({ TemplateName: this.getTemplateName(language) });
    }

    async setWelcomeEmail(emailTemplate: EmailTemplate, language: 'english' | 'french'): Promise<CreateTemplateCommandOutput | UpdateTemplateCommandOutput> {
        const templateName = this.getTemplateName(language);
        const Template = {
            TemplateName: templateName,
            SubjectPart: emailTemplate.subject,
            HtmlPart: emailTemplate.body
        };
        if ((await this.ses.listTemplates({})).TemplatesMetadata.find(template => template.Name === templateName)) {
            console.log("Updating template with name " + templateName);
            return this.ses.updateTemplate({ Template });
        } else {
            console.log("Creating template with name " + templateName);
            return this.ses.createTemplate({ Template });
        }
    }

    async sendWelcomeEmail(destination: string, language: 'english' | 'french') {
        const templateName = this.getTemplateName(language);
        return this.ses.sendTemplatedEmail({
            Source: this.source,
            Destination: { ToAddresses: [destination] },
            Template: templateName,
            TemplateData: '{}',
        });
    }

    async sendEmailToAll(emailTemplate: BilingualEmailTemplate, subscriptions: Subscription[]) {
        const [frenchResult, englishResult] = await Promise.all([
            await this.sendEmailToLanguage(subscriptions, emailTemplate.french, 'french'),
            await this.sendEmailToLanguage(subscriptions, emailTemplate.english, 'english'),
        ]);
        let success = 0;
        let errors = 0;
        for (const result of [...frenchResult, ...englishResult]) {
            if (result.Status !== 'Success') {
                console.error(`Error when sending email: ${result.Error}`);
                errors++;
            } else {
                success++;
            }
        }
        return { success, errors };
    }

    async sendEmailToLanguage(subscriptions: Subscription[], emailTemplate: EmailTemplate, language: 'english' | 'french') {
        const emails = subscriptions
            .filter(subscription => subscription.language === language)
            .map(subscription => subscription.email);
        return this.createAndSendTemplatedEmail(emails, emailTemplate, language + "-template");
    }

    async createAndSendTemplatedEmail(destination: string[], emailTemplate: EmailTemplate, templateName: string="test-template") {
        await this.ses.createTemplate({
            Template: {
                TemplateName: templateName,
                SubjectPart: emailTemplate.subject,
                HtmlPart: emailTemplate.body,
            }
        });
        const output = await this.sendEmail(destination, templateName, true);
        await this.ses.deleteTemplate({ TemplateName: templateName });
        return output;
    }

    async sendEmail(to: string[], template: string, addGameKey: boolean) {
        const destination: BulkEmailDestination[] = [];
        for (const email of to) {
            const gameKey = await this.gameKeyService.getGameKey();
            const ReplacementTemplateData = addGameKey ? JSON.stringify({ GAME_KEY: gameKey }) : "{}";
            destination.push({
                Destination: { ToAddresses: [email] },
                ReplacementTemplateData,
            });
        }
        const params: SendBulkTemplatedEmailCommandInput = {
            Source: 'abrupt.game@gmail.com',
            Destinations: destination,
            DefaultTemplateData: JSON.stringify({ GAME_KEY: "NO-GAME-KEY" }),
            Template: template,
        };
        return (await this.ses.sendBulkTemplatedEmail(params)).Status;
    }

    /** Templates */

    async listTemplates() {
        return this.ses.listTemplates({});
    }

    async getTemplate(templateName: string) {
        return this.ses.getTemplate({ TemplateName: templateName });
    }
    
    async setTemplate(templateName: string, emailTemplate: EmailTemplate) {
        const Template = {
            TemplateName: templateName,
            SubjectPart: emailTemplate.subject,
            HtmlPart: emailTemplate.body
        };
        if ((await this.ses.listTemplates({})).TemplatesMetadata.find(template => template.Name === templateName)) {
            console.log("Updating template with name " + templateName);
            return this.ses.updateTemplate({ Template });
        } else {
            console.log("Creating template with name " + templateName);
            return this.ses.createTemplate({ Template });
        }
    }

    async deleteTemplate(templateName: string) {
        return this.ses.deleteTemplate({ TemplateName: templateName });
    }

}