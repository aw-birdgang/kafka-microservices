import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { APP_FILTER } from '@nestjs/core';
import {
  KafkaServer,
  MicroserviceRpcExceptionFilter,
} from '@birdgang/lib-common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: KafkaServer.KAFKA_ACCOUNT_SERVER,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get<string>(
                'KAFKA_ACCOUNT_CLIENT_PREFIX',
              ),
              brokers: configService
                .get<string>('KAFKA_BROKER_URL')
                .split(',')
                .sort(() => Math.random() - 0.5),
            },
            consumer: {
              groupId: configService.get<string>(
                'KAFKA_ACCOUNT_CONSUMER_GROUP_PREFIX',
              ),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MicroserviceRpcExceptionFilter,
    },
    KafkaService,
  ],
  exports: [KafkaService],
})
export class KafkaModule {}
