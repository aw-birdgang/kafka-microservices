import { Controller } from '@nestjs/common';
import { AccountPlayerService } from './account-player.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AccountMessagePatterns,
  TcpRequest,
  TcpResponse,
} from '@birdgang/lib-common';
import { AccountPlayerResponseDto } from './dto/account-player-response.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { PlayerUserSocialDto } from './dto/player-user-social.dto';

@Controller()
export class AccountPlayerController {
  constructor(private accountPlayerService: AccountPlayerService) {}

  @MessagePattern(AccountMessagePatterns.ACCOUNT_findPlayerUserById)
  async findPlayerUserById(@Payload() request: TcpRequest<number>) {
    const user = await this.accountPlayerService.findById(request.data);
    return TcpResponse.from<AccountPlayerResponseDto>(
      user.toPlayerUserDto(),
    ).toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_findPlayerUserByUsername)
  async findPlayerUserByUsername(@Payload() request: TcpRequest<string>) {
    console.log('findPlayerUserByUsername -> ', request);
    const user = await this.accountPlayerService.findByUsername(request.data);
    return TcpResponse.from<AccountPlayerResponseDto>(
      user.toPlayerUserDto(),
    ).toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_findPlayerUserByEmail)
  async findPlayerUserByEmail(@Payload() request: TcpRequest<string>) {
    console.log('findPlayerUserByEmail -> ', request);
    const user = await this.accountPlayerService.findByEmail(request.data);
    return TcpResponse.from<AccountPlayerResponseDto>(
      user.toPlayerUserDto(),
    ).toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_findPlayerUserPasswordHashById)
  async findPlayerUserPasswordHashById(@Payload() request: TcpRequest<number>) {
    console.log('findPlayerUserPasswordHashById -> ', request);
    const user = await this.accountPlayerService.findById(request.data);
    return TcpResponse.from<string>(user.passwordHash).toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_signUpPlayerUser)
  async playerUserSignUp(@Payload() request: TcpRequest<SignUpDto>) {
    console.log('playerUserSignUp -> ', request.data);
    const user = await this.accountPlayerService.create(request.data);
    return TcpResponse.from<AccountPlayerResponseDto>(
      user.toPlayerUserDto(),
    ).toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_playerUserGoogleLogin)
  async playerUserGoogleLogin(
    @Payload() request: TcpRequest<PlayerUserSocialDto>,
  ) {
    const success =
      await this.accountPlayerService.playerUserGoogleLogin(request);
    return TcpResponse.from<string>(success).toString();
  }
}
