import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { GoogleStrategy } from './guard/google.strategy';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JwtService,
    AdminService,
    GoogleStrategy,
  ],
  controllers: [AdminController],
  exports: [],
})
export class AdminModule {}
