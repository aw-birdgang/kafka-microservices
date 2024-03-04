import {
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcryptjs from 'bcryptjs';
import { SignUpDto } from './dto/sign-up.dto';
import { UserDto } from '../account/dto/user.dto';
import {
  AccountTcpCommands,
  ClientHttpException,
  convertErrorMessage,
  ErrorCodes,
  TcpRequest,
  TcpServices,
} from '@birdgang/lib-common';
import { LogInDto } from './dto/log-in.dto';
import { isEmpty } from 'class-validator';
import { RequestRefreshTokenDto } from './dto/request-refresh-token.dto';
import { JWTokenDto, Payload } from './dto';
import { EditTokenParameter } from '../entities/account.parameter';
import { ClientAccessType } from '../enums/account.enum';
import { format } from 'date-fns';
import { AuthDto } from './dto/auth.dto';
import { AccountService } from '../account/account.service';
import { AccountRegisterService } from '../account/account-register.service';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private readonly jwtSecretKey = process.env.JWT_SECRET_KEY;

  constructor(
    @Inject(TcpServices.LOTTO_GAME_SERVER)
    private readonly lottoClient: ClientProxy,
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
    private readonly accountRegisterService: AccountRegisterService,
  ) {}

  signUp(signUpDto: SignUpDto): Promise<UserDto> {
    const request = TcpRequest.from<SignUpDto>(signUpDto);
    return this.send<UserDto>(AccountTcpCommands.ACCOUNT_USER_SIGNUP, request);
  }

  async login(loginDto: LogInDto) {
    console.log('login start...');
    const userDto = await this.accountService.findByUsername(loginDto.username);
    if (isEmpty(userDto)) {
      throw new ClientHttpException(
        HttpStatus.UNAUTHORIZED,
        convertErrorMessage(ErrorCodes.AUT_ERROR_001),
        null,
      );
    }
    console.log('login user : ', userDto);
    const passwordHash = await this.accountService.findPasswordHashById(
      userDto.id,
    );
    console.log('login passwordHash : ', passwordHash);
    if (passwordHash !== loginDto.password) {
      throw new ClientHttpException(
        HttpStatus.UNAUTHORIZED,
        convertErrorMessage(ErrorCodes.AUT_ERROR_002),
        null,
      );
    }
    // Password comparison
    // const same = await this.comparePasswords(loginDto.password, passwordHash);
    // if (!same) {
    //   throw new UnauthorizedException();
    // }

    const payload = { username: userDto.username, sub: userDto.id };
    // console.log("login payload : ", payload);
    const jWTokenDto = new JWTokenDto();
    jWTokenDto.accessToken = await this.generateAccessToken(payload);
    jWTokenDto.refreshToken = await this.generateRefreshToken(payload);

    await this.accountRegisterService.editToken(
      EditTokenParameter.from(
        userDto.id,
        ClientAccessType.USER,
        jWTokenDto.refreshToken,
      ),
    );

    return jWTokenDto;
  }

  async refresh(
    requestRefreshToken: RequestRefreshTokenDto,
  ): Promise<JWTokenDto> {
    const userDto = await this.accountService.findByUsername(
      requestRefreshToken.username,
    );
    if (isEmpty(userDto)) {
      throw new UnauthorizedException();
    }

    const payload = { username: userDto.username, sub: userDto.id, roles: [] };
    const jwtToken = new JWTokenDto();
    jwtToken.accessToken = await this.generateAccessToken(payload);
    jwtToken.refreshToken = await this.generateRefreshToken(payload);
    await this.accountRegisterService.editToken(
      EditTokenParameter.from(
        userDto.id,
        ClientAccessType.USER,
        jwtToken.refreshToken,
      ),
    );

    return jwtToken;
  }

  tokenVerify(token: string): Promise<Payload> {
    return this.jwtService.verifyAsync(token, {
      secret: this.jwtSecretKey,
    });
  }

  private generateAccessToken(payload: object): Promise<string> {
    const options = {
      secret: this.jwtSecretKey,
      expiresIn: '7d',
    };
    return this.jwtService.signAsync(payload, options);
  }

  private generateRefreshToken(payload: object): Promise<string> {
    const options = {
      secret: this.jwtSecretKey,
      expiresIn: '30d',
    };
    return this.jwtService.signAsync(payload, options);
  }

  private hashPassword(password: string): Promise<string> {
    return bcryptjs.hash(password, 12);
  }

  private comparePasswords(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return bcryptjs.compare(password, passwordHash);
  }

  async googleLoginCallBack(req: any) {
    if (!req.user) {
      console.error('No user from google');
    }
    const name = req.user.lastName + req.user.firstName;
    const email = req.user.email;

    const request = {
      email: email,
      name: name,
      googleAccessToken: req.user.accessToken,
      socialType: 'google',
    };

    await this.send<AuthDto>(
      AccountTcpCommands.ACCOUNT_playerUserGoogleLogin,
      request,
    );

    const payload = { username: name, sub: email, roles: [] };
    const jwtToken = new JWTokenDto();
    jwtToken.accessToken = await this.generateAccessToken(payload);
    jwtToken.refreshToken = await this.generateRefreshToken(payload);
    await this.accountRegisterService.editToken(
      EditTokenParameter.from(
        email,
        ClientAccessType.USER,
        jwtToken.refreshToken,
      ),
    );

    const result = {
      email: email,
      jwt: jwtToken.accessToken,
      refresh: jwtToken.refreshToken,
      expiresIn: format(new Date(), "yyyy-MM-dd'T'HH:mm:00.000"),
    };

    return result;
  }

  send<TResult = any>(pattern: string | object, data: any): Promise<TResult> {
    console.log('send  -> ', pattern, data);
    let cmd = '';
    if (typeof pattern === 'string') {
      cmd = pattern;
    } else if (typeof pattern === 'object') {
      cmd = pattern['cmd'];
    }
    return lastValueFrom(
      this.lottoClient
        .send<TResult>({ cmd }, data)
        .pipe
        // catchError((error) => {
        //     throw new ClientHttpException(HttpStatus.INTERNAL_SERVER_ERROR, error, null);
        // }),
        (),
    );
  }
}
