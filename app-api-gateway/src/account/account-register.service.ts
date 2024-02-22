import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import {
  AccountTcpCommands,
  TcpRequest,
  TcpServices,
} from '@birdgang/lib-common';
import { EditTokenParameter } from '../entities/account.parameter';
import { CreateClientRegisterDto } from './dto/create-client-register.dto';
import { ClientRegisterDto } from './dto/client-register.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AccountRegisterService {
  constructor(
    @Inject(TcpServices.LOTTO_GAME_SERVER)
    private readonly lottoClient: ClientProxy,
  ) {}

  create(parameter: CreateClientRegisterDto): Promise<ClientRegisterDto> {
    const request = TcpRequest.from<CreateClientRegisterDto>(parameter);
    return this.send(
      AccountTcpCommands.ACCOUNT_CLIENT_REGISTER_CREATE,
      request,
    );
  }

  editToken(parameter: EditTokenParameter): Promise<boolean> {
    const request = TcpRequest.from<EditTokenParameter>(parameter);
    return this.send(
      AccountTcpCommands.ACCOUNT_CLIENT_REGISTER_EDIT_TOKEN,
      request,
    );
  }

  send<TResult = any>(pattern: string | object, data: any): Promise<TResult> {
    console.log('send  -> ', pattern, data);
    let cmd = '';
    if (typeof pattern === 'string') {
      cmd = pattern;
    } else if (typeof pattern === 'object') {
      cmd = pattern['cmd'];
    }
    return lastValueFrom(
      this.lottoClient
        .send<TResult>({ cmd }, data)
        .pipe
        // catchError((error) => {
        //     throw new ClientHttpException(HttpStatus.INTERNAL_SERVER_ERROR, error, null);
        // }),
        (),
    );
  }
}
