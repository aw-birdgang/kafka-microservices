import { forwardRef, Module } from '@nestjs/common';
import { KafkaModule } from './microservice/kafka.module';
import { ConfigModule } from './config';
import { AuthPlayerModule } from './auth-player/auth-player.module';

@Module({
  imports: [
    forwardRef(() => ConfigModule),
    forwardRef(() => KafkaModule),
    forwardRef(() => AuthPlayerModule),
  ],
})
export class AppModule {}
