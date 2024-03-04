import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DataValidationModule, LanguageModule } from '@birdgang/lib-common';
import { FinanceService } from './api/finance/finance.service';
import { FinanceController } from './api/finance/finance.controller';
import { FinanceModule } from './api/finance/finance.module';

@Module({
  imports: [
    forwardRef(() => LanguageModule),
    forwardRef(() => DataValidationModule),
    FinanceModule,
  ],
  controllers: [AppController, FinanceController],
  providers: [AppService, FinanceService],
  // providers: [
  //   {
  //     provide: APP_FILTER,
  //     useClass: HttpExceptionFilter,
  //   },
  // ],
})
export class AppModule {}
