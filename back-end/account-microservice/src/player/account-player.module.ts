import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AccountPlayerService} from "./services/account-player.service";
import {AccountPlayerController} from "./controller/account-player.controller";
import {PlayerUser} from "./entities/player-user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([PlayerUser]),
    ],
    providers: [AccountPlayerService],
    controllers: [AccountPlayerController],
    exports: [AccountPlayerService],
})
export class AccountPlayerModule {}
