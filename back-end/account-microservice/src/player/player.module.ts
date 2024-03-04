import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { GoogleStrategy } from './guard/google.strategy';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JwtService,
    PlayerService,
    GoogleStrategy,
  ],
  controllers: [PlayerController],
  exports: [],
})
export class PlayerModule {}
