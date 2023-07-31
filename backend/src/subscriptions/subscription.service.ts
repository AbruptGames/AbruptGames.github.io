import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { validateOrReject } from 'class-validator';
import { EmailsService } from 'src/emails/emails.service';

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectRepository(Subscription) private readonly subscriptionRepository: Repository<Subscription>,
        private readonly emailsService: EmailsService,
    ) {}

    async create(email: string, language: 'english' | 'french', newsletter: boolean) {
        const subscription = new Subscription();
        subscription.email = email;
        subscription.language = language;
        subscription.newsletter = newsletter;
        if (await this.subscriptionRepository.exist({ where: { email }})) {
            throw new Error(`${email} is already subscribed`);
        }
        await validateOrReject(subscription);
        await this.emailsService.sendWelcomeEmail(email, language);
        return this.subscriptionRepository.save(subscription);
    }

    async delete(email: string) {
        const result: DeleteResult = await this.subscriptionRepository.delete({ email });
        if (result.affected == 0) {
            throw new Error(`No subscription found for email : ${email}`);
        }
    }

    getAll(): Promise<Subscription[]> {
        return this.subscriptionRepository.find();
    }
}