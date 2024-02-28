import { RpcException } from '@nestjs/microservices';

export class CustomRpcException extends RpcException {
  constructor(error: string | object) {
    super(error);
  }
}
