import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('v1', {
    exclude: [{ path: 'api/health', method: RequestMethod.GET }],
  });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_CLIENT_PREFIX,
        brokers: process.env.KAFKA_BROKER_URL.split(',').sort(
          () => Math.random() - 0.5,
        ),
      },
      consumer: {
        groupId: process.env.KAFKA_CONSUMER_GROUP_PREFIX,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(Number(process.env.SERVER_PORT));
}
bootstrap();
