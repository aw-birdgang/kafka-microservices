import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRegisterService } from './account-register.service';

@Module({
  // imports: [forwardRef(() => CommonModule), forwardRef(() => TicketModule), forwardRef(() => FinanceModule)],
  providers: [AccountService, AccountRegisterService],
  controllers: [AccountController],
  exports: [AccountService, AccountRegisterService],
})
export class AccountModule {}
