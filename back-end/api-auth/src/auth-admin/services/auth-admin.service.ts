import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcryptjs from 'bcryptjs';
import { isEmpty } from 'class-validator';
import { format } from 'date-fns';
import { KafkaService } from '../../microservice/kafka.service';
import { CreateAdminUserDto } from '../../account/dto/create-admin-user.dto';
import { AdminUserDto } from '../../account/dto/admin-user.dto';
import {
  AccountMessagePatterns,
  ClientHttpException,
  convertErrorMessage,
  ErrorCodes,
  TcpRequest,
} from '@birdgang/lib-common';
import { LogInDto } from '../dto/log-in.dto';
import { JWTokenDto } from '../dto/jwt-tokens.dto';
import { EditTokenParameter } from '../../account/params/account.parameter';
import { ClientAccessType } from '../../account/enum/account.enum';
import { RequestRefreshTokenDto } from '../dto/request-refresh-token.dto';
import { Payload } from '../dto/jwt-payload.dto';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthAdminService {
  private readonly jwtSecretKey = process.env.JWT_SECRET_KEY;

  constructor(
    private readonly jwtService: JwtService,
    private readonly accountKafkaClientService: KafkaService,
  ) {}

  createAdminUser(
    createAdminUserDto: CreateAdminUserDto,
  ): Promise<AdminUserDto> {
    const request = TcpRequest.from<CreateAdminUserDto>(createAdminUserDto);
    return this.accountKafkaClientService.send<AdminUserDto>(
      AccountMessagePatterns.ACCOUNT_createAdminUser,
      request,
    );
  }

  async login(loginDto: LogInDto) {
    console.log('login start...');

    const userDtoRequest = TcpRequest.from<string>(loginDto.username);
    const userDto = await this.accountKafkaClientService.send<AdminUserDto>(
      AccountMessagePatterns.ACCOUNT_findAdminUserByUsername,
      userDtoRequest,
    );
    if (isEmpty(userDto)) {
      throw new ClientHttpException(
        HttpStatus.UNAUTHORIZED,
        convertErrorMessage(ErrorCodes.AUT_ERROR_001),
        null,
      );
    }
    const passwordHashRequest = TcpRequest.from<number>(userDto.id);
    const passwordHash = await this.accountKafkaClientService.send<string>(
      AccountMessagePatterns.ACCOUNT_findAdminUserPasswordHashById,
      passwordHashRequest,
    );
    //기존 코드 if (passwordHash !== loginDto.password) {
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
    // console.log("login payload : ", payload);
    const jwtToken = new JWTokenDto();
    jwtToken.accessToken = await this.generateAccessToken(payload);
    jwtToken.refreshToken = await this.generateRefreshToken(payload);

    const parameters = EditTokenParameter.from(
      userDto.id,
      ClientAccessType.ADMIN_USER,
      jwtToken.refreshToken,
    );
    const request = TcpRequest.from<EditTokenParameter>(parameters);

    await this.accountKafkaClientService.send(
      AccountMessagePatterns.ACCOUNT_editClientRegisterToken,
      request,
    );

    return jwtToken;
  }

  async refresh(
    requestRefreshToken: RequestRefreshTokenDto,
  ): Promise<JWTokenDto> {
    const userDtoRequest = TcpRequest.from<string>(
      requestRefreshToken.username,
    );
    const userDto = await this.accountKafkaClientService.send<AdminUserDto>(
      AccountMessagePatterns.ACCOUNT_findAdminUserByUsername,
      userDtoRequest,
    );
    if (isEmpty(userDto)) {
      throw new ClientHttpException(
        HttpStatus.UNAUTHORIZED,
        convertErrorMessage(ErrorCodes.AUT_ERROR_001),
        null,
      );
    }

    const payload = { username: userDto.username, sub: userDto.id, roles: [] };
    const jwtToken = new JWTokenDto();
    jwtToken.accessToken = await this.generateAccessToken(payload);
    jwtToken.refreshToken = await this.generateRefreshToken(payload);

    const parameters = EditTokenParameter.from(
      userDto.id,
      ClientAccessType.ADMIN_USER,
      jwtToken.refreshToken,
    );
    const request = TcpRequest.from<EditTokenParameter>(parameters);

    await this.accountKafkaClientService.send(
      AccountMessagePatterns.ACCOUNT_editClientRegisterToken,
      request,
    );

    return jwtToken;
  }

  tokenVerify(token: string): Promise<Payload> {
    return this.jwtService.verifyAsync<Payload>(token, {
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

    await this.accountKafkaClientService.send<AuthDto>(
      AccountMessagePatterns.ACCOUNT_adminUserGoogleLogin,
      request,
    );

    const payload = { username: name, sub: email, roles: [] };
    const jwtToken = new JWTokenDto();
    jwtToken.accessToken = await this.generateAccessToken(payload);
    jwtToken.refreshToken = await this.generateRefreshToken(payload);

    const parameters = EditTokenParameter.from(
      email,
      ClientAccessType.ADMIN_USER,
      jwtToken.refreshToken,
    );
    const tcpRequest = TcpRequest.from<EditTokenParameter>(parameters);

    await this.accountKafkaClientService.send(
      AccountMessagePatterns.ACCOUNT_editClientRegisterToken,
      tcpRequest,
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
