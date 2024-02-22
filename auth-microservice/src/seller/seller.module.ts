import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JwtService,
    SellerService,
  ],
  controllers: [SellerController],
  exports: [],
})
export class SellerModule {}
