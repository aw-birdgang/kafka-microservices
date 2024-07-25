import { Controller, Logger } from '@nestjs/common';
import { AccountPlayerService } from '../services/account-player.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AccountMessagePatterns,
  TcpRequest,
  TcpResponse,
} from '@birdgang/lib-common';
import { AccountPlayerResponseDto } from '../dto/account-player-response.dto';

@Controller()
export class AccountPlayerController {
  constructor(private accountPlayerService: AccountPlayerService) {}

  private readonly logger = new Logger(AccountPlayerController.name);

  @MessagePattern(AccountMessagePatterns.ACCOUNT_findPlayerUserById)
  async findPlayerUserById(@Payload() request: TcpRequest<number>) {
    const user = await this.accountPlayerService.findById(request.data);
    return TcpResponse.from<AccountPlayerResponseDto>(
      user.toPlayerUserDto(),
    ).toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_findPlayerUserByUsername)
  async findPlayerUserByUsername(@Payload() request: TcpRequest<string>) {
    const user = await this.accountPlayerService.findByUsername(request.data);
    return TcpResponse.from<AccountPlayerResponseDto>(
      user.toPlayerUserDto(),
    ).toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_findPlayerUserByEmail)
  async findPlayerUserByEmail(@Payload() request: TcpRequest<string>) {
    const user = await this.accountPlayerService.findByEmail(request.data);
    return TcpResponse.from<AccountPlayerResponseDto>(
      user.toPlayerUserDto(),
    ).toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_findPlayerUserPasswordHashById)
  async findPlayerUserPasswordHashById(@Payload() request: TcpRequest<number>) {
    const user = await this.accountPlayerService.findById(request.data);
    return TcpResponse.from<string>(user.passwordHash).toString();
  }
}
