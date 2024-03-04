import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { AuthSellerService } from './auth-seller.service';
import { AuthSellerController } from './auth-seller.controller';
import { KafkaModule } from '../microservice/kafka.module';

@Module({
  imports: [forwardRef(() => KafkaModule)],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JwtService,
    AuthSellerService,
  ],
  controllers: [AuthSellerController],
  exports: [],
})
export class AuthSellerModule {}
