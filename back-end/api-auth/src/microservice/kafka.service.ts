import {
  HttpStatus,
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  AccountMessagePatterns,
  ClientHttpException,
  KafkaServer,
} from '@birdgang/lib-common';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(KafkaServer.KAFKA_ACCOUNT_SERVER)
    private readonly accountKafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    Object.values(AccountMessagePatterns).map((pattern) =>
      this.accountKafkaClient.subscribeToResponseOf(pattern),
    );
    await this.accountKafkaClient.connect();
  }

  async onModuleDestroy() {
    await this.accountKafkaClient.close();
  }

  send<TResult = any>(pattern: string | object, data: any): Promise<TResult> {
    let cmd = '';
    if (typeof pattern === 'string') {
      cmd = pattern;
    } else if (typeof pattern === 'object') {
      cmd = pattern['cmd'];
    }

    // const result$ = this.accountKafkaClient.send<TResult>(cmd, JSON.stringify(data));
    // result$.subscribe({
    //   next: (data: TResult) => {
    //     console.log("kafka subscribe data -> ", data);
    //     return data;
    //   },
    //   error: (error) => {
    //     console.log("Handling error locally and rethrowing it...", error);
    //     throw new ClientHttpException(HttpStatus.INTERNAL_SERVER_ERROR, error, null);
    //   }
    // })

    return lastValueFrom(
      this.accountKafkaClient.send<TResult>(cmd, JSON.stringify(data)).pipe(
        map((value) => {
          console.log('kafka response value -> ', JSON.stringify(value));
          return value;
        }),
        catchError((error) => {
          console.log('kafka error ->', error);
          throw new ClientHttpException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            error,
            null,
          );
        }),
      ),
    );
  }
}
