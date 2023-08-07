import { Controller, Post, Body, HttpException, HttpStatus, Delete, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm/error/QueryFailedError';
import { EmailsModule } from './emails/emails.module';
import { EmailsService } from './emails/emails.service';
@Controller()
export class AppController {
    constructor(
        private readonly emailsService: EmailsService
    ) {}

    @Post("subscribe")
    async create(@Body('email') email: string, @Body('language') language: 'french' | 'english', @Body("newsletter") newsletter: boolean) {
        try {
            console.log("Subscribing");
            return await this.emailsService.createOrAddContact(email, language, newsletter);
        } catch (error: QueryFailedError | unknown) {
            console.log(error);
            if (error instanceof QueryFailedError) {
                throw new HttpException(`Database Error: ${error.message}`, HttpStatus.BAD_REQUEST);
            } else if (typeof error === 'object' && error !== null && 'message' in error) {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException("Unknown error happened", HttpStatus.INTERNAL_SERVER_ERROR);
            }

        }
    }

    @Delete("subscribe")
    async delete(@Body('email') email: string) {
        console.log("unsubscribing " + email);
        try {
            await this.emailsService.removeContact(email);
            return "Unsubscribed successfully";
        } catch (error) {
            throw new NotFoundException(`${email} is not subscribed`);
        }
    }
}