import {forwardRef, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';

import {
  DataValidationModule, HealthController,
  HealthModule,
  HttpExceptionFilter,
  LanguageModule,
} from '@birdgang/lib-common';

@Module({
  imports: [
    forwardRef(() => LanguageModule),
    forwardRef(() => DataValidationModule),
  ],
  controllers: [AppController, ],
  providers: [AppService, ],
  // providers: [
  //   {
  //     provide: APP_FILTER,
  //     useClass: HttpExceptionFilter,
  //   },
  // ],
})

export class AppModule {}
