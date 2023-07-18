import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { MailService } from './mail.service';
import { Subscription } from './subscription.entity';

@Controller('subscriptions')
export class SubscriptionController {
    constructor(
        private readonly subscriptionService: SubscriptionService
    ) {}

    @Post()
    async create(@Body('email') email: string, @Body('language') language: 'french' | 'english') {
        try {
            return this.subscriptionService.create(email, language);
        } catch (error) {
            if (error.errno == 19) {
                throw new HttpException(`${email} is already subscribed`, HttpStatus.CONFLICT);
            }
            throw error;
        }
    }

    @Get()
    getAll() {
        return this.subscriptionService.getAll();
    }
}