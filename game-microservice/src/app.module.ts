import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DataValidationModule, LanguageModule } from '@birdgang/lib-common';

@Module({
  imports: [
    forwardRef(() => LanguageModule),
    forwardRef(() => DataValidationModule),
  ],
  controllers: [AppController],
  providers: [AppService],
  // providers: [
  //   {
  //     provide: APP_FILTER,
  //     useClass: HttpExceptionFilter,
  //   },
  // ],
})
export class AppModule {}
