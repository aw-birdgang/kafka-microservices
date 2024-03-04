import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpClientService } from './http-client.service';

@Module({
  imports: [HttpModule],
  providers: [HttpClientService],
  exports: [HttpClientService], // 다른 모듈에서 HttpClientService를 사용할 수 있도록 export
})
export class HttpClientModule {}
