import { Module } from '@nestjs/common';
import { GameKeyService } from './emails/gameKey.service';
import { SubscriptionModule } from './subscriptions/subscription.module';
import { AppController } from './app.controller';

@Module({
    imports: [SubscriptionModule],
    controllers: [AppController],
    providers: [GameKeyService],
})
export class AppModule {}
