import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserDto} from "../../dto/user.dto";
import {SignUpDto} from "../../dto/sign-up.dto";
import {AccountKafkaClientService, AccountMessagePatterns, TcpRequest} from '@birdgang/lib-common';


@Injectable()
export class PlayerService {
    private readonly jwtSecretKey = process.env.JWT_SECRET_KEY;

    constructor(
        private readonly jwtService: JwtService,
        private readonly accountKafkaClientService: AccountKafkaClientService,
    ) {}

    signUp(signUpDto: SignUpDto): Promise<UserDto> {
        const request = TcpRequest.from<SignUpDto>(signUpDto);
        return this.accountKafkaClientService.send<UserDto>(
            AccountMessagePatterns.ACCOUNT_signUpPlayerUser,
            request,
        );
    }

}
