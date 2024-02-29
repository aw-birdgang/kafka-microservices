import { Controller } from '@nestjs/common';
import { AuthSellerService } from './auth-seller.service';
import { Public } from './guard/auth.decorator';
import { MessagePattern } from '@nestjs/microservices';
import {
  AuthMessagePatterns,
  TcpRequest,
  TcpResponse,
} from '@birdgang/lib-common';
import { LogInDto } from './dto/log-in.dto';
import { JWTokenDto } from './dto/jwt-tokens.dto';
import { RequestRefreshTokenDto } from './dto/request-refresh-token.dto';

@Controller()
export class AuthSellerController {
  constructor(private readonly authService: AuthSellerService) {}

  @Public()
  @MessagePattern(AuthMessagePatterns.AUTH_sellerUserLogin)
  async login(request: TcpRequest<LogInDto>) {
    const result = await this.authService.login(request.data);
    return TcpResponse.from<JWTokenDto>(result).toString();
  }

  @Public()
  @MessagePattern(AuthMessagePatterns.AUTH_sellerUserRefreshToken)
  async refresh(request: TcpRequest<RequestRefreshTokenDto>) {
    const result = await this.authService.refresh(request.data);
    return TcpResponse.from<JWTokenDto>(result).toString();
  }
}
