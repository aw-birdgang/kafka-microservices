import {forwardRef, Module} from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AccountModule} from "../account/account.module";
import {APP_GUARD} from "@nestjs/core";
import {JwtService} from "@nestjs/jwt";
import {AuthGuard} from "./guard/auth.guard";
import {GoogleStrategy} from "./guard/google.strategy";
import {AuthService} from "./auth.service";


@Module({
    imports: [forwardRef(() => AccountModule)],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        JwtService,
        AuthService,
        GoogleStrategy
    ],
    controllers: [AuthController],
    exports: [],
})
export class AuthModule {}
