import { Controller, Logger } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Public } from './guard/auth.decorator';
import { MessagePattern } from '@nestjs/microservices';
import {
  AuthMessagePatterns,
  TcpRequest,
  TcpResponse,
} from '@birdgang/lib-common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserDto } from '../account/player/dto/user.dto';
import { LogInDto } from './dto/log-in.dto';
import { JWTokenDto } from './dto';
import { RequestRefreshTokenDto } from './dto/request-refresh-token.dto';

@Controller()
export class PlayerController {
  constructor(private readonly authService: PlayerService) {}

  private readonly logger = new Logger(PlayerController.name);

  @Public()
  @MessagePattern(AuthMessagePatterns.AUTH_playerUserSignup)
  async signup(request: TcpRequest<SignUpDto>) {
    this.logger.log('signup  -> ', request.data);
    const result = await this.authService.signUp(request.data);
    return TcpResponse.from<UserDto>(result).toString();
  }

  @Public()
  @MessagePattern(AuthMessagePatterns.AUTH_playerUserLogin)
  async login(request: TcpRequest<LogInDto>) {
    this.logger.log('signup  -> ', request.data);
    const result = await this.authService.login(request.data);
    return TcpResponse.from<JWTokenDto>(result).toString();
  }

  @Public()
  @MessagePattern(AuthMessagePatterns.AUTH_playerUserRefreshToken)
  async refresh(request: TcpRequest<RequestRefreshTokenDto>) {
    this.logger.log('refresh  -> ', request.data);
    const result = await this.authService.refresh(request.data);
    return TcpResponse.from<JWTokenDto>(result).toString();
  }
}
