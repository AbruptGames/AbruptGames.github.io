import { Controller, Get, Post, Body, HttpException, HttpStatus, Delete, Res, NotFoundException } from '@nestjs/common';
import { SubscriptionService } from './subscriptions/subscription.service';
import { QueryFailedError } from 'typeorm/error/QueryFailedError';
import { AWSError } from 'aws-sdk';

@Controller()
export class AppController {
    constructor(
        private readonly subscriptionService: SubscriptionService
    ) {}

    @Post("subscribe")
    async create(@Body('email') email: string, @Body('language') language: 'french' | 'english', @Body("newsletter") newsletter: boolean) {
        try {
            return await this.subscriptionService.create(email, language, newsletter);
        } catch (error: QueryFailedError | AWSError | unknown) {
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
            await this.subscriptionService.delete(email);
            return "Unsubscribed successfully";
        } catch (error) {
            throw new NotFoundException(`${email} is not subscribed`);
        }
    }
}