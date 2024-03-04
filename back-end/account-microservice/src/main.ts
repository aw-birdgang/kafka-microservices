import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.SOCKET_HOST,
      port: Number(process.env.SOCKET_PORT),
    },
  });
  await app.listen();
  console.log("Account Service Server is running... ");
}
bootstrap();
