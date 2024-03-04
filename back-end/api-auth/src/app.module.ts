import { forwardRef, Module } from '@nestjs/common';
import { AuthAdminModule } from './auth-admin/auth-admin.module';
import { AuthPlayerModule } from './auth-player/auth-player.module';
import { AuthSellerModule } from './auth-seller/auth-seller.module';
import { KafkaModule } from './microservice/kafka.module';

@Module({
  imports: [
    forwardRef(() => KafkaModule),
    forwardRef(() => AuthAdminModule),
    forwardRef(() => AuthPlayerModule),
    forwardRef(() => AuthSellerModule),
  ],
})
export class AppModule {}
