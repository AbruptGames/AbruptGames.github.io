import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './subscription.entity';
import { MailService } from './mail.service';
import { EmailsController } from './emails.controller';
import { GameKeyService } from './gameKey.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'newsletter.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Subscription]),
  ],
  controllers: [SubscriptionController, EmailsController],
  providers: [SubscriptionService, MailService, GameKeyService],
})
export class AppModule {}
