import {Module} from '@nestjs/common';
import {APP_FILTER} from '@nestjs/core';
import {HttpExceptionFilter} from './exception/http-exception.filter';
import {TcpClientService} from './microservice/TcpClientService';
import {TerminusModule} from '@nestjs/terminus';

@Module({
  imports: [
    TerminusModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    TcpClientService,
  ],
  controllers: [],
  exports: [TcpClientService],
})
export class CommonModule {}
