import { Injectable } from '@nestjs/common';
import { GameKeyService } from './gameKey.service';
import * as sendGridMail from '@sendgrid/mail';
import * as sendgridClient from '@sendgrid/client';
import { ClientRequest } from '@sendgrid/client/src/request';


@Injectable()
export class EmailsService {
    private readonly source: string = "abrupt.game@gmail.com";
    private readonly FRENCH_WELCOME_TEMPLATE_ID: string = "d-02aa9f3368704579b2b3c2f8e8bc4cd6";
    private readonly ENGLISH_WELCOME_TEMPLATE_ID: string = "d-ca43bcf498034eef80c8af3a11b57510";


    constructor(
        private readonly gameKeyService: GameKeyService,
    ) {
        sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
        sendgridClient.setApiKey(process.env.SENDGRID_API_KEY);
    }

    async createOrAddContact(email: string, language: 'french' | 'english', newsletter: boolean) {
        const request: ClientRequest = {
            method: 'PUT',
            url: '/v3/marketing/contacts',
            body: {
                contacts: [{
                    email, 
                    custom_fields: {
                        e1_T: language,
                        e2_T: newsletter ? "true" : "false",
                    }}
                ]
            },
        };
        try {
            const [response, body] = await sendgridClient.request(request);
            console.log(response.statusCode);
            console.log(body);
            console.log("Sending welcome email");
            const mailData: sendGridMail.MailDataRequired = {
                to: email,
                from: this.source,
                templateId: language == "french" ? this.FRENCH_WELCOME_TEMPLATE_ID : this.ENGLISH_WELCOME_TEMPLATE_ID,
            };
            await sendGridMail.send(mailData);
        } catch (e) {
            console.log(e.response.body.errors[0].message);
        }
    }

    private async searchContact(email: string) {
        const request: ClientRequest = {
            method: 'POST',
            url: `/v3/marketing/contacts/search`,
            body: {
                "query": `email LIKE '${email}'`
            }
        };
        try {
            const [response, body] = await sendgridClient.request(request);
            console.log(response.statusCode);
            console.log(body);
            return body.result;
        } catch (e) {
            console.log(e);
        }
    }

    async removeContact(email: string) {
        const contacts = await this.searchContact(email);
        const request: ClientRequest = {
            method: 'DELETE',
            url: `/v3/marketing/contacts?ids=${contacts[0].id}`,
        };
        try {
            const [response, body] = await sendgridClient.request(request);
            console.log(response.statusCode);
            console.log(body);
        } catch (e) {
            console.log(e);
        }
    }

    // async listContacts() {
    //     const request: ClientRequest = {
    //         method: 'GET',
    //         url: '/v3/marketing/contacts',
    //     };
    //     try {
    //         const [response, body] = await sendgridClient.request(request);
    //         console.log(response.statusCode);
    //         console.log(body.result[1].custom_fields);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // async listCustomFields() {
    //     const request: ClientRequest = {
    //         method: 'GET',
    //         url: '/v3/marketing/field_definitions',
    //     };
    //     try {
    //         const [response, body] = await sendgridClient.request(request);
    //         console.log(response.statusCode);
    //         console.log(body);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // async getImportContactStatus(id: string) {
    //     const request: ClientRequest = {
    //         method: 'GET',
    //         url: `/v3/marketing/contacts/imports/${id}`,
    //     };
    //     try {
    //         const [response, body] = await sendgridClient.request(request);
    //         console.log(response.statusCode);
    //         console.log(body);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    async listTemplates() {
        const request: ClientRequest = {
            method: 'GET',
            url: '/v3/templates',
        };
        try {
            const [response, body] = await sendgridClient.request(request);
            console.log(response.statusCode);
            console.log(body);
        } catch (e) {
            console.log(e);
        }
    }
}