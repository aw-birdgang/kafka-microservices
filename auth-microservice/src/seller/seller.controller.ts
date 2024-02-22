import { Controller, Logger } from '@nestjs/common';
import { SellerService } from './seller.service';
import { Public } from './guard/auth.decorator';
import { MessagePattern } from '@nestjs/microservices';
import {
  AuthMessagePatterns,
  TcpRequest,
  TcpResponse,
} from '@birdgang/lib-common';
import { LogInDto } from './dto/log-in.dto';
import { JWTokenDto } from './dto';
import { RequestRefreshTokenDto } from './dto/request-refresh-token.dto';

@Controller()
export class SellerController {
  constructor(private readonly authService: SellerService) {}

  private readonly logger = new Logger(SellerController.name);

  @Public()
  @MessagePattern(AuthMessagePatterns.AUTH_sellerUserLogin)
  async login(request: TcpRequest<LogInDto>) {
    this.logger.log('login  -> ', request.data);
    const result = await this.authService.login(request.data);
    return TcpResponse.from<JWTokenDto>(result).toString();
  }

  @Public()
  @MessagePattern(AuthMessagePatterns.AUTH_sellerUserRefreshToken)
  async refresh(request: TcpRequest<RequestRefreshTokenDto>) {
    this.logger.log('refresh  -> ', request.data);
    const result = await this.authService.refresh(request.data);
    return TcpResponse.from<JWTokenDto>(result).toString();
  }
}
