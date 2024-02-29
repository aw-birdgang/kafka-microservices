import { MessagePattern } from '@nestjs/microservices';
import { AuthAdminService } from './auth-admin.service';
import {
  AuthMessagePatterns,
  TcpRequest,
  TcpResponse,
} from '@birdgang/lib-common';
import { Controller } from '@nestjs/common';
import { LogInDto } from './dto/log-in.dto';
import { JWTokenDto } from './dto/jwt-tokens.dto';
import { Public } from './guard/auth.decorator';
import { RequestRefreshTokenDto } from './dto/request-refresh-token.dto';

@Controller()
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Public()
  @MessagePattern(AuthMessagePatterns.AUTH_adminUserLogin)
  async login(request: TcpRequest<LogInDto>) {
    const result = await this.authAdminService.login(request['logInDto']);
    return TcpResponse.from<JWTokenDto>(result).toString();
  }

  @Public()
  @MessagePattern(AuthMessagePatterns.AUTH_adminUserRefreshToken)
  async refresh(request: TcpRequest<RequestRefreshTokenDto>) {
    const result = await this.authAdminService.refresh(
      request['requestRefreshTokenDto'],
    );
    return TcpResponse.from<JWTokenDto>(result).toString();
  }
}
