import { Controller } from '@nestjs/common';
import { AccountRegisterService } from '../services/account-register.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  AccountMessagePatterns,
  TcpRequest,
  TcpResponse,
} from '@birdgang/lib-common';
import { CreateClientRegisterDto } from '../dto/create-client-register.dto';
import { ClientRegisterDto } from '../dto/client-register.dto';
import {EditTokenParameter} from "../../enum/account.parameter";

@Controller()
export class AccountRegisterController {
  constructor(private accountRegisterService: AccountRegisterService) {}

  @MessagePattern(AccountMessagePatterns.ACCOUNT_createClientRegister)
  async createClientRegister(request: TcpRequest<CreateClientRegisterDto>) {
    const clientRegister = await this.accountRegisterService.create(
      request.data,
    );
    return TcpResponse.from<ClientRegisterDto>(
      clientRegister.toClientRegisterDto(),
    ).toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_editClientRegisterToken)
  async editClientRegisterToken(request: TcpRequest<EditTokenParameter>) {
    const success = await this.accountRegisterService.editToken(
      request.data.accessUserId,
      request.data.accessType,
      request.data.jwtRefreshToken,
    );
    return TcpResponse.from<boolean>(success).toString();
  }
}
