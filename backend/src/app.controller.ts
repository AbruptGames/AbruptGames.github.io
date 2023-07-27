import { Controller, Get, Post, Body, HttpException, HttpStatus, Delete, Res, NotFoundException } from '@nestjs/common';
import { SubscriptionService } from './subscriptions/subscription.service';

@Controller()
export class AppController {
    constructor(
        private readonly subscriptionService: SubscriptionService
    ) {}

    @Post("subscribe")
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

    @Delete("subscribe")
    async delete(@Res() res: Response, @Body('email') email: string) {
        console.log("unsubscribing " + email);
        try {
            await this.subscriptionService.delete(email);
            return "Unsubscribed successfully";
        } catch (error) {
            throw new NotFoundException(`${email} is not subscribed`);
        }
    }
}