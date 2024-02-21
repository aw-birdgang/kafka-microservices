import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {ClientKafka} from '@nestjs/microservices';
import {lastValueFrom, map} from 'rxjs';
import {KafkaServer} from "../enums/microservice.enum";
import {AccountMessagePatterns} from "../enums";

@Injectable()
export class AccountKafkaClientService implements OnModuleInit {
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

    return lastValueFrom(
      this.accountKafkaClient.send<TResult>(cmd, JSON.stringify(data)).pipe(
        map((value) => {
          return value;
        }),
        // catchError((error) => {
        //   throw new ClientHttpException(
        //       HttpStatus.INTERNAL_SERVER_ERROR,
        //       error,
        //       null,
        //   );
        // }),
      ),
    )
    // .then(value => {
    //   console.log('Last value from observable:', value);
    // }).catch(error => {
    //   console.error('Error occurred while processing observable:', error);
    // });
  }
}
