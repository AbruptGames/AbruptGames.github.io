import { Module } from "@nestjs/common";
import { EmailsService } from "./emails.service";
import { GameKeyService } from "src/emails/gameKey.service";

@Module({
    imports: [],
    controllers: [],
    providers: [EmailsService, GameKeyService],
    exports: [EmailsService],
})
export class EmailsModule { }