import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { GoogleStrategy } from './guard/google.strategy';
import { AuthPlayerService } from './services/auth-player.service';
import { AuthPlayerController } from './controller/auth-player.controller';
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
    AuthPlayerService,
    GoogleStrategy,
  ],
  controllers: [AuthPlayerController],
  exports: [],
})
export class AuthPlayerModule {}
