import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { GoogleStrategy } from './guard/google.strategy';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminController } from './auth-admin.controller';
import { KafkaModule } from '../microservice/kafka.module';

@Module({
  imports: [forwardRef(() => KafkaModule)],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JwtService,
    AuthAdminService,
    GoogleStrategy,
  ],
  controllers: [AuthAdminController],
  exports: [],
})
export class AuthAdminModule {}
