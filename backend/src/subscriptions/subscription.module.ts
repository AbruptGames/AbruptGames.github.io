import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity';
import { SubscriptionService } from './subscription.service';
import { EmailsModule } from 'src/emails/emails.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "sqlite",
            database: "newsletter.db",
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Subscription]),
        EmailsModule,
    ],
    controllers: [],
    providers: [SubscriptionService],
    exports: [SubscriptionService],
})
export class SubscriptionModule { }