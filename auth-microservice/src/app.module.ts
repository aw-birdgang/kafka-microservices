import { forwardRef, Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { SellerModule } from './seller/seller.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    // forwardRef(() => AdminModule),
    // forwardRef(() => PlayerModule),
    // forwardRef(() => SellerModule),
  ],
})
export class AppModule {}
