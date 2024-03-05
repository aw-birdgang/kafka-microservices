import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RequestMethod } from '@nestjs/common';
import { ConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const kafkaClientPrefix = configService.get('KAFKA_CLIENT_PREFIX');
  const kafkaBrokerUrl = configService.get('KAFKA_BROKER_URL');
  const kafkaConsumerGroupPrefix = configService.get(
    'KAFKA_CONSUMER_GROUP_PREFIX',
  );
  const serverPort = configService.get('SERVER_PORT');
  console.log('kafkaClientPrefix :' + kafkaClientPrefix);
  console.log('kafkaBrokerUrl :' + kafkaBrokerUrl);
  console.log('kafkaConsumerGroupPrefix :' + kafkaConsumerGroupPrefix);
  console.log('serverPort :' + serverPort);

  app.enableCors();
  app.setGlobalPrefix('v1', {
    exclude: [{ path: 'api/health', method: RequestMethod.GET }],
  });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: kafkaClientPrefix,
        brokers: kafkaBrokerUrl.split(',').sort(() => Math.random() - 0.5),
      },
      consumer: {
        groupId: kafkaConsumerGroupPrefix,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(Number(serverPort));
}
bootstrap();
