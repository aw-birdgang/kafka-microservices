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
import { LogInDto } from './dto/log-in.dto';
import { UserDto } from '../account/dto/user.dto';
import { isEmpty } from 'class-validator';
import { JWTokenDto, Payload } from './dto';
import { EditTokenParameter } from '../account/model/account.parameter';
import { ClientAccessType } from '../account/enums/account.enum';
import { RequestRefreshTokenDto } from './dto/request-refresh-token.dto';
import bcryptjs from 'bcryptjs';
import { AccountKafkaClientService } from '../microservice/kafka-account-client-service';

@Injectable()
export class SellerService {
  private readonly jwtSecretKey = process.env.JWT_SECRET_KEY;

  constructor(
    private readonly jwtService: JwtService,
    private readonly accountKafkaClientService: AccountKafkaClientService,
  ) {}

  private readonly logger = new Logger(SellerService.name);

  async login(loginDto: LogInDto) {
    const userDtoRequest = TcpRequest.from<string>(loginDto.username);
    const userDto = await this.accountKafkaClientService.send<UserDto>(
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
    this.logger.log('login user : ', userDto);
    const passwordHashRequest = TcpRequest.from<number>(userDto.id);
    const passwordHash = await this.accountKafkaClientService.send<string>(
      AccountMessagePatterns.ACCOUNT_findAdminUserPasswordHashById,
      passwordHashRequest,
    );
    this.logger.log('login passwordHash : ', passwordHash);
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
    const jwtTokenDto = new JWTokenDto();
    jwtTokenDto.accessToken = await this.generateAccessToken(payload);
    jwtTokenDto.refreshToken = await this.generateRefreshToken(payload);

    const tokenParameters = EditTokenParameter.from(
      userDto.id,
      ClientAccessType.ADMIN_USER,
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
      AccountMessagePatterns.ACCOUNT_findAdminUserByUsername,
      userDtoRequest,
    );
    if (isEmpty(userDto)) {
      throw new UnauthorizedException();
    }

    const payload = { username: userDto.username, sub: userDto.id, roles: [] };
    const jwtTokenDto = new JWTokenDto();
    jwtTokenDto.accessToken = await this.generateAccessToken(payload);
    jwtTokenDto.refreshToken = await this.generateRefreshToken(payload);
    const tokenParameters = EditTokenParameter.from(
      userDto.id,
      ClientAccessType.ADMIN_USER,
      jwtTokenDto.refreshToken,
    );
    const tokenRequest = TcpRequest.from<EditTokenParameter>(tokenParameters);
    await this.accountKafkaClientService.send(
      AccountMessagePatterns.ACCOUNT_editClientRegisterToken,
      tokenRequest,
    );

    return jwtTokenDto;
  }

  tokenVerify(token: string): Promise<Payload> {
    return this.jwtService.verifyAsync(token, {
      secret: this.jwtSecretKey,
    });
  }

  private generateAccessToken(payload: object): Promise<string> {
    this.logger.log('generateAccessToken  -> ', this.jwtSecretKey);
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
}
