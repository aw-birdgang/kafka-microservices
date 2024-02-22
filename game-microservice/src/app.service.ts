import { Injectable } from '@nestjs/common';
import {
  ErrorCodes,
} from '@birdgang/lib-common';

@Injectable()
export class AppService {
  getHello(): string {
    return ErrorCodes.AUT_ERROR_002 + ' , Hello World!';
  }
}
