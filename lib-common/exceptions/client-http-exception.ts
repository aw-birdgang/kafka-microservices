import { HttpException, HttpExceptionOptions } from '@nestjs/common';

export class ClientHttpException extends HttpException {
  constructor(
    statusCode: number,
    objectOrError?: string | object | any,
    httpExceptionOptions?: HttpExceptionOptions,
  ) {
    super(
      HttpException.createBody(objectOrError, '', statusCode),
      statusCode,
      httpExceptionOptions,
    );
  }
}
