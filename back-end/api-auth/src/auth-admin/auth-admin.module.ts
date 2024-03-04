import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { GoogleStrategy } from './guard/google.strategy';
import { AuthAdminService } from './services/auth-admin.service';
import { AuthAdminController } from './controller/auth-admin.controller';
import { KafkaModule } from '../microservice/kafka.module';
import {ConfigModule} from "../config";

@Module({
  imports: [
    forwardRef(() => ConfigModule),
    forwardRef(() => KafkaModule),
  ],
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
