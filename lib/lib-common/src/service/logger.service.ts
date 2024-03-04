import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService implements LoggerService {
  log(message: string) {
    console.log(message);
  }

  error(message: string, trace: string) {
    console.error(message, trace);
  }

  warn(message: string) {
    console.warn(message);
  }
  // 다른 메서드(debug, verbose 등)도 구현할 수 있음
}
