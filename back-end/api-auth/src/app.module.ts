import { forwardRef, Module } from '@nestjs/common';
import { AuthAdminModule } from './auth-admin/auth-admin.module';
import { AuthPlayerModule } from './auth-player/auth-player.module';
import { KafkaModule } from './microservice/kafka.module';
import {ConfigModule} from "./config";

@Module({
  imports: [
    forwardRef(() => ConfigModule),
    forwardRef(() => KafkaModule),
    // forwardRef(() => AuthAdminModule),
    // forwardRef(() => AuthPlayerModule),
  ],
})
export class AppModule {}
