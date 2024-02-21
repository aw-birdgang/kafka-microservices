import {Module} from '@nestjs/common';
import {AccountService} from './account/account.service';
import {AccountController} from './account/account.controller';
import {AccountModule} from './account/account.module';
import {AuthService} from './auth/auth.service';
import {AuthController} from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

// @Module({
//   imports: [AccountModule, AuthModule],
//   controllers: [AccountController, AuthController],
//   providers: [AccountService, AuthService],
// })

@Module({
  imports: [AuthModule, AccountModule, GameModule, TicketModule, FinanceModule],
})
export class AppModule {}
