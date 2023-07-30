import { Injectable } from '@nestjs/common';
import { SESV2 } from 'aws-sdk';
import { GameKeyService } from './gameKey.service';
import { BulkEmailEntry, EmailTemplateContent, SendBulkEmailRequest } from 'aws-sdk/clients/sesv2';
import { SendEmailRequest } from 'aws-sdk/clients/sesv2';

export interface BilingualEmailTemplate {
    french: EmailTemplate;
    english: EmailTemplate;
}

export interface EmailTemplate {
    subject: string;
    body: string;
}

export interface Contact {
    email: string,
    unsubscribed: boolean,
    newsletter: boolean,
}


@Injectable()
export class EmailsService {
    private readonly ses: SESV2;
    private readonly SOURCE_EMAIL: string = "abrupt.game@gmail.com";
    private readonly CONTACT_LIST_NAME: string = "main";
    private readonly NEWSLETTER_TOPIC_NAME: string = "newsletter";
    private readonly GAME_KEY_TOPIC_NAME: string = "game_key";
    private readonly FRENCH_SUFFIX: string = "-french";
    private readonly ENGLISH_SUFFIX: string = "-english";

    constructor(
        private readonly gameKeyService: GameKeyService,
    ) {
        this.ses = new SESV2({
            region: "eu-west-3",
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID,
                secretAccessKey: process.env.SECRET_ACCESS_KEY,
            }
        });
        //this.createMainContactListIfNeeded();
    }

    private async createMainContactListIfNeeded() {
        const listList = await this.ses.listContactLists({ PageSize: 1}).promise();
        if (listList.ContactLists.length === 0) {
            console.log("Creating contact list " + this.CONTACT_LIST_NAME);
            await this.ses.createContactList({
                ContactListName: this.CONTACT_LIST_NAME,
                Topics: [
                    {
                        TopicName : this.GAME_KEY_TOPIC_NAME + this.ENGLISH_SUFFIX,
                        DisplayName: "GameKey",
                        DefaultSubscriptionStatus: "OPT_OUT",
                    },
                    {
                        TopicName : this.NEWSLETTER_TOPIC_NAME + this.ENGLISH_SUFFIX,
                        DisplayName: "Newsletter English",
                        DefaultSubscriptionStatus: "OPT_OUT",
                    },                    {
                        TopicName : this.GAME_KEY_TOPIC_NAME + this.FRENCH_SUFFIX,
                        DisplayName: "GameKey French",
                        DefaultSubscriptionStatus: "OPT_OUT",
                    },
                    {
                        TopicName : this.NEWSLETTER_TOPIC_NAME + this.FRENCH_SUFFIX,
                        DisplayName: "Newsletter French",
                        DefaultSubscriptionStatus: "OPT_OUT",
                    },
                ]
            }).promise();
        }
    }

    // private getTemplateName(language: 'english' | 'french'): string {
    //     return "welcome-template-" + language;
    // }

    // async getWelcomeEmail(language: 'english' | 'french') {
    //     const templateName = this.getTemplateName(language);
    //     return this.ses.getEmailTemplate({ TemplateName: templateName });
    // }

    // async setWelcomeEmail(emailTemplate: EmailTemplate, language: 'english' | 'french'): Promise<CreateTemplateCommandOutput | UpdateTemplateCommandOutput> {
    //     const templateName = this.getTemplateName(language);
    //     const Template = {
    //         TemplateName: templateName,
    //         SubjectPart: emailTemplate.subject,
    //         HtmlPart: emailTemplate.body
    //     };
    //     if ((await this.ses.listEmailTemplates({})).TemplatesMetadata.find(template => template.Name === templateName)) {
    //         console.log("Updating template with name " + templateName);
    //         return this.ses.updateTemplate({ Template });
    //     } else {
    //         console.log("Creating template with name " + templateName);
    //         return this.ses.createTemplate({ Template });
    //     }
    // }

    // async sendWelcomeEmail(destination: string, language: 'english' | 'french') {
    //     const templateName = language + "-welcome-template";
    //     return this.ses.sendTemplatedEmail({
    //         Source: this.source,
    //         Destination: { ToAddresses: [destination] },
    //         Template: templateName,
    //         TemplateData: '{}',
    //     });
    // }

    // async sendEmailToAll(emailTemplate: BilingualEmailTemplate, subscriptions: Subscription[]) {
    //     const [frenchResult, englishResult] = await Promise.all([
    //         await this.sendEmailToLanguage(subscriptions, emailTemplate.french, 'french'),
    //         await this.sendEmailToLanguage(subscriptions, emailTemplate.english, 'english'),
    //     ]);
    //     let success = 0;
    //     let errors = 0;
    //     for (const result of [...frenchResult, ...englishResult]) {
    //         if (result.Status !== 'Success') {
    //             console.error(`Error when sending email: ${result.Error}`);
    //             errors++;
    //         } else {
    //             success++;
    //         }
    //     }
    //     return { success, errors };
    // }

    // async sendEmailToLanguage(subscriptions: Subscription[], emailTemplate: EmailTemplate, language: 'english' | 'french') {
    //     const emails = subscriptions
    //         .filter(subscription => subscription.language === language)
    //         .map(subscription => subscription.email);
    //     return this.createAndSendTemplatedEmail(emails, emailTemplate, language + "-template");
    // }

    // async createAndSendTemplatedEmail(destination: string[], emailTemplate: EmailTemplate, templateName: string="test-template") {
    //     await this.ses.createEmailTemplate({
    //         TemplateName: templateName,
    //         TemplateContent: {
    //             Subject: emailTemplate.subject,
    //             Html: emailTemplate.body,
    //         }
    //     });
    //     const output = await this.sendEmail(destination, templateName);
    //     this.ses.deleteEmailTemplate({ TemplateName: templateName });
    //     return output;
    // }

    /** CONTACTS */

    async listContacts(): Promise<Contact[]> {
        const contacts = await this.ses.listContacts({
            ContactListName: this.CONTACT_LIST_NAME,
            PageSize: 1000,
        }).promise();

        const result: Contact[] = [];
        contacts.Contacts.forEach(contact => result.push({
            email: contact.EmailAddress,
            unsubscribed: contact.UnsubscribeAll,
            newsletter: contact.TopicPreferences.some(t => t.TopicName == this.NEWSLETTER_TOPIC_NAME && t.SubscriptionStatus === "OPT_IN")
        }));
        return result;
    }

    async getContactGameKey(EmailAddress: string): Promise<string> {
        const contact = await this.ses.getContact({
            ContactListName: this.CONTACT_LIST_NAME,
            EmailAddress
        }).promise();
        const attributes = JSON.parse(contact.AttributesData || "{}");
        return attributes.GAME_KEY;
    }

    async createContact(EmailAddress: string, language: "english" | "french", newsletter: boolean) {
        console.log("creating contact");
        return this.ses.createContact({
            EmailAddress,
            ContactListName: this.CONTACT_LIST_NAME,
            TopicPreferences: [
                {
                    TopicName: this.NEWSLETTER_TOPIC_NAME + (language == "english" ? this.ENGLISH_SUFFIX : this.FRENCH_SUFFIX),
                    SubscriptionStatus: newsletter ? "OPT_IN" : "OPT_OUT"
                },
                {
                    TopicName: this.GAME_KEY_TOPIC_NAME + (language == "english" ? this.ENGLISH_SUFFIX : this.FRENCH_SUFFIX),
                    SubscriptionStatus: "OPT_IN"
                }
            ],
            UnsubscribeAll: false,
            AttributesData: JSON.stringify({ language })
        }).promise();
    }

    async addGameKeyToContact(EmailAddress: string) {
        const contactResp = await this.ses.getContact({ ContactListName: this.CONTACT_LIST_NAME, EmailAddress }).promise();
        const contact = JSON.parse(contactResp.AttributesData || "{}");
        contact.GAME_KEY = this.gameKeyService.getGameKey();
        console.log("Added " + contact.GAME_KEY + " to " + EmailAddress);
        return this.ses.updateContact({
            ContactListName: this.CONTACT_LIST_NAME,
            EmailAddress,
            AttributesData: JSON.stringify(contact)
        }).promise();
    }

    async unsubscribeContact(EmailAddress: string) {
        return this.ses.updateContact({
            ContactListName: this.CONTACT_LIST_NAME,
            EmailAddress,
            UnsubscribeAll: true,
        }).promise();
    }

    async deleteContact(EmailAddress: string) {
        return this.ses.deleteContact({ ContactListName: this.CONTACT_LIST_NAME, EmailAddress }).promise();
    }

    /** SEND EMAIL */

    async sendEmail(TemplateName: string, TopicName: string) {
        const { Contacts } = await this.ses.listContacts({
            ContactListName: this.CONTACT_LIST_NAME,
            Filter: { TopicFilter: { TopicName }}
        }).promise();
        const entries: BulkEmailEntry[] = Contacts.map(c => {
            return {
                Destination: { ToAddresses: [c.EmailAddress]}
            }
        });
        console.log(Contacts[0].TopicPreferences);
        const params: SendBulkEmailRequest = {
            FromEmailAddress: this.SOURCE_EMAIL,
            BulkEmailEntries: [{Destination: { ToAddresses: ["celianhaydont@gmail.com"] }}],
            DefaultContent: {
                Template: { TemplateName, TemplateData: "{}" }
            }
        };
        console.log("Sending email");
        return this.ses.sendBulkEmail(params).promise();
    }

    /** TEMPLATES */

    async listTemplates() {
        return this.ses.listEmailTemplates({}).promise();
    }

    async getTemplate(templateName: string) {
        return this.ses.getEmailTemplate({ TemplateName: templateName }).promise();
    }
    
    async setTemplate(TemplateName: string, TemplateContent: EmailTemplateContent) {
        console.log("setting template " + TemplateName);
        if ((await this.ses.listEmailTemplates({}).promise()).TemplatesMetadata.find(template => template.TemplateName === TemplateName)) {
            console.log("Updating template with name " + TemplateName);
            return this.ses.updateEmailTemplate({ TemplateName, TemplateContent }).promise();
        } else {
            console.log("Creating template with name " + TemplateName);
            return this.ses.createEmailTemplate({ TemplateName, TemplateContent }).promise();
        }
    }

    async deleteTemplate(templateName: string) {
        return this.ses.deleteEmailTemplate({ TemplateName: templateName }).promise();
    }
}