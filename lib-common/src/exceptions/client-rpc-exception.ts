import { RpcException } from '@nestjs/microservices';
import { isNotEmpty } from 'class-validator';
import { convertErrorMessage } from '../enums';

export class ClientRpcException extends RpcException {
  constructor(objectOrError: string | object) {
    if (typeof objectOrError === 'string') {
      const errorMessage = convertErrorMessage(objectOrError);
      if (isNotEmpty(errorMessage)) {
        objectOrError = errorMessage;
      }
    }
    super(objectOrError);
  }
}
