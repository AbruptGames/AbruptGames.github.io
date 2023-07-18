import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { validateOrReject } from 'class-validator';
import { MailService } from './mail.service';

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectRepository(Subscription) private readonly subscriptionRepository: Repository<Subscription>,
        private readonly mailService: MailService,
    ) {}

    async create(email: string, language: 'english' | 'french') {
        const subscription = new Subscription();
        subscription.email = email;
        subscription.language = language;
        await validateOrReject(subscription);
        const output = await this.mailService.sendWelcomeEmail(email, language);
        if (output.$metadata.httpStatusCode === 200) {
            return this.subscriptionRepository.save(subscription);
        } else {
            throw new Error(`Error when sending welcome email to : ${email}`);
        }
    }

    async delete(email: string): Promise<void> {
        await this.subscriptionRepository.delete({ email });
    }

    getAll(): Promise<Subscription[]> {
        return this.subscriptionRepository.find();
    }
}