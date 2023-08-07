import { Module } from '@nestjs/common';
import { GameKeyService } from './emails/gameKey.service';
import { AppController } from './app.controller';
import { EmailsModule } from './emails/emails.module';

@Module({
    imports: [EmailsModule],
    controllers: [AppController],
    providers: [GameKeyService],
})
export class AppModule {}
