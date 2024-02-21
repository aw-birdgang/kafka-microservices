import {Inject, Injectable} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {AccountTcpCommands, TcpRequest, TcpServices} from '@birdgang/lib-common';
import {UserDto} from "./dto/user.dto";
import {SignUpDto} from "../auth/dto/sign-up.dto";
import {UserProfileDto} from "./dto/user-profile.dto";

@Injectable()
export class AccountService {

    constructor(
        @Inject(TcpServices.LOTTO_GAME_SERVER) private readonly lottoClient: ClientProxy
    ) {}

    signUp(signUpDto: SignUpDto): Promise<UserDto> {
        const request = TcpRequest.from<SignUpDto>(signUpDto);
        return this.send<UserDto>(AccountTcpCommands.ACCOUNT_USER_SIGNUP, request);
    }

    findById(userId: number): Promise<UserDto> {
        const request = TcpRequest.from<number>(userId);
        return this.send<UserDto>(AccountTcpCommands.ACCOUNT_USER_BY_ID, request);
    }

    findByUsername(username: string): Promise<UserDto> {
        const request = TcpRequest.from<string>(username);
        return this.send<UserDto>(AccountTcpCommands.ACCOUNT_USER_BY_USERNAME, request);
    }

    findByEmail(email: string): Promise<UserDto> {
        const request = TcpRequest.from<string>(email);
        return this.send<UserDto>(AccountTcpCommands.ACCOUNT_USER_BY_EMAIL, request);
    }

    findPasswordHashById(userId: number): Promise<string> {
        const request = TcpRequest.from<number>(userId);
        return this.send<string>(AccountTcpCommands.ACCOUNT_USER_PASSWORD_HASH_BY_ID, request);
    }

    findUserProfileById(userId: number): Promise<UserProfileDto> {
        const request = TcpRequest.from<number>(userId);
        return this.send<UserProfileDto>(AccountTcpCommands.ACCOUNT_USER_PROFILE_BY_ID, request);
    }

    send<TResult = any>(pattern: string | object, data: any): Promise<TResult> {
        console.log("send  -> ", pattern, data);
        let cmd = "";
        if (typeof pattern === "string") {
            cmd = pattern;
        } else if (typeof pattern === "object") {
            cmd = pattern["cmd"];
        }
        return lastValueFrom(
            this.lottoClient.send<TResult>({ cmd }, data).pipe(
                // catchError((error) => {
                //     throw new ClientHttpException(HttpStatus.INTERNAL_SERVER_ERROR, error, null);
                // }),
            ),
        );
    }

}
