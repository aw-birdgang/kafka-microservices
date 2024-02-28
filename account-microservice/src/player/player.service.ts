import {
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AccountMessagePatterns,
  ClientHttpException,
  convertErrorMessage,
  ErrorCodes,
  TcpRequest,
} from '@birdgang/lib-common';
import { UserDto } from '../account/player/dto/user.dto';
import { EditTokenParameter } from '../account/account.parameter';
import bcryptjs from 'bcryptjs';
import { format } from 'date-fns';
import { isEmpty } from 'class-validator';
import { SignUpDto } from './dto/sign-up.dto';
import { LogInDto } from './dto/log-in.dto';
import { JWTokenDto, Payload } from './dto';
import { RequestRefreshTokenDto } from './dto/request-refresh-token.dto';
import { AuthDto } from './dto/auth.dto';
import { ClientAccessType } from '../account/account.enum';
import { AccountKafkaClientService } from '../microservice/kafka-account-client-service';

@Injectable()
export class PlayerService {
  private readonly jwtSecretKey = process.env.JWT_SECRET_KEY;

  constructor(
    private readonly jwtService: JwtService,
    private readonly accountKafkaClientService: AccountKafkaClientService,
  ) {}

  private readonly logger = new Logger(PlayerService.name);

  signUp(signUpDto: SignUpDto): Promise<UserDto> {
    const request = TcpRequest.from<SignUpDto>(signUpDto);
    return this.accountKafkaClientService.send<UserDto>(
      AccountMessagePatterns.ACCOUNT_signUpPlayerUser,
      request,
    );
  }

  async login(loginDto: LogInDto) {
    const userDtoRequest = TcpRequest.from<string>(loginDto.username);
    const userDto = await this.accountKafkaClientService.send<UserDto>(
      AccountMessagePatterns.ACCOUNT_findPlayerUserByUsername,
      userDtoRequest,
    );

    if (isEmpty(userDto)) {
      throw new ClientHttpException(
        HttpStatus.UNAUTHORIZED,
        convertErrorMessage(ErrorCodes.AUT_ERROR_001),
        null,
      );
    }

    const passwordHashRequest = TcpRequest.from<number>(userDto['data'].id);
    const passwordHash = await this.accountKafkaClientService.send<string>(
      AccountMessagePatterns.ACCOUNT_findPlayerUserPasswordHashById,
      passwordHashRequest,
    );

    if (passwordHash['data'] !== loginDto.password) {
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
    const jwtTokenDto = new JWTokenDto();
    jwtTokenDto.accessToken = await this.generateAccessToken(payload);
    jwtTokenDto.refreshToken = await this.generateRefreshToken(payload);

    const tokenParameters = EditTokenParameter.from(
      userDto.id,
      ClientAccessType.PLAYER_USER,
      jwtTokenDto.refreshToken,
    );
    const tokenRequest = TcpRequest.from<EditTokenParameter>(tokenParameters);
    await this.accountKafkaClientService.send(
      AccountMessagePatterns.ACCOUNT_editClientRegisterToken,
      tokenRequest,
    );

    return jwtTokenDto;
  }

  async refresh(
    requestRefreshToken: RequestRefreshTokenDto,
  ): Promise<JWTokenDto> {
    const userDtoRequest = TcpRequest.from<string>(
      requestRefreshToken.username,
    );
    const userDto = await this.accountKafkaClientService.send<UserDto>(
      AccountMessagePatterns.ACCOUNT_findPlayerUserByUsername,
      userDtoRequest,
    );

    if (isEmpty(userDto)) {
      throw new UnauthorizedException();
    }

    const payload = { username: userDto.username, sub: userDto.id, roles: [] };
    const jwtToken = new JWTokenDto();
    jwtToken.accessToken = await this.generateAccessToken(payload);
    jwtToken.refreshToken = await this.generateRefreshToken(payload);

    const tokenParameters = EditTokenParameter.from(
      userDto.id,
      ClientAccessType.PLAYER_USER,
      jwtToken.refreshToken,
    );
    const tokenRequest = TcpRequest.from<EditTokenParameter>(tokenParameters);
    await this.accountKafkaClientService.send(
      AccountMessagePatterns.ACCOUNT_editClientRegisterToken,
      tokenRequest,
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
      this.logger.error('No user from google');
    }
    const name = req.user.lastName + req.user.firstName;
    const email = req.user.email;

    const request = {
      email: email,
      name: name,
      googleAccessToken: req.user.accessToken,
      socialType: 'google',
    };

    await this.accountKafkaClientService.send<AuthDto>(
      AccountMessagePatterns.ACCOUNT_playerUserGoogleLogin,
      request,
    );

    const payload = { username: name, sub: email, roles: [] };
    const jwtToken = new JWTokenDto();
    jwtToken.accessToken = await this.generateAccessToken(payload);
    jwtToken.refreshToken = await this.generateRefreshToken(payload);

    const tokenParameters = EditTokenParameter.from(
      email,
      ClientAccessType.PLAYER_USER,
      jwtToken.refreshToken,
    );
    const tokenRequest = TcpRequest.from<EditTokenParameter>(tokenParameters);
    await this.accountKafkaClientService.send(
      AccountMessagePatterns.ACCOUNT_editClientRegisterToken,
      tokenRequest,
    );

    const result = {
      email: email,
      jwt: jwtToken.accessToken,
      refresh: jwtToken.refreshToken,
      expiresIn: format(new Date(), "yyyy-MM-dd'T'HH:mm:00.000"),
    };

    return result;
  }
}
