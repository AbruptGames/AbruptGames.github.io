import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { SubscriptionModule } from "src/subscriptions/subscription.module";
import { EmailsModule } from "src/emails/emails.module";

@Module({
    imports: [EmailsModule, SubscriptionModule],
    controllers: [AdminController],
    providers: [],
})
export class AdminModule { }