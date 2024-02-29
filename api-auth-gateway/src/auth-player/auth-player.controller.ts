import { Controller } from '@nestjs/common';
import { AuthPlayerService } from './auth-player.service';
import { Public } from './guard/auth.decorator';
import {
  AuthMessagePatterns,
  TcpRequest,
  TcpResponse,
} from '@birdgang/lib-common';
import { MessagePattern } from '@nestjs/microservices';
import { SignUpDto } from './dto/sign-up.dto';
import { UserDto } from '../account/dto/user.dto';
import { LogInDto } from './dto/log-in.dto';
import { JWTokenDto } from './dto/jwt-tokens.dto';
import { RequestRefreshTokenDto } from './dto/request-refresh-token.dto';

@Controller()
export class AuthPlayerController {
  constructor(private readonly authPlayerService: AuthPlayerService) {}

  @Public()
  @MessagePattern(AuthMessagePatterns.AUTH_playerUserSignup)
  async signup(request: TcpRequest<SignUpDto>) {
    const result = await this.authPlayerService.signUp(request.data);
    return TcpResponse.from<UserDto>(result).toString();
  }

  @Public()
  @MessagePattern(AuthMessagePatterns.AUTH_playerUserLogin)
  async login(request: TcpRequest<LogInDto>) {
    const result = await this.authPlayerService.login(request.data);
    return TcpResponse.from<JWTokenDto>(result).toString();
  }

  @Public()
  @MessagePattern(AuthMessagePatterns.AUTH_playerUserRefreshToken)
  async refresh(request: TcpRequest<RequestRefreshTokenDto>) {
    const result = await this.authPlayerService.refresh(request.data);
    return TcpResponse.from<JWTokenDto>(result).toString();
  }
}
