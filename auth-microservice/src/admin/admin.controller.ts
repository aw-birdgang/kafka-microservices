import { Controller, Logger } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Public } from './guard/auth.decorator';
import {
  AuthMessagePatterns,
  TcpRequest,
  TcpResponse,
} from '@birdgang/lib-common';
import { MessagePattern } from '@nestjs/microservices';
import { LogInDto } from './dto/log-in.dto';
import { JWTokenDto } from './dto/jwt-tokens.dto';
import { RequestRefreshTokenDto } from './dto/request-refresh-token.dto';

@Controller()
export class AdminController {
  constructor(private readonly authService: AdminService) {}

  private readonly logger = new Logger(AdminController.name);

  @Public()
  @MessagePattern(AuthMessagePatterns.AUTH_adminUserLogin)
  async login(request: TcpRequest<LogInDto>) {
    this.logger.log('login  -> ', request['logInDto']);
    const result = await this.authService.login(request['logInDto']);
    return TcpResponse.from<JWTokenDto>(result).toString();
  }

  @Public()
  @MessagePattern(AuthMessagePatterns.AUTH_adminUserRefreshToken)
  async refresh(request: TcpRequest<RequestRefreshTokenDto>) {
    this.logger.log('refresh  -> ', request['requestRefreshTokenDto']);
    const result = await this.authService.refresh(
      request['requestRefreshTokenDto'],
    );
    return TcpResponse.from<JWTokenDto>(result).toString();
  }
}
