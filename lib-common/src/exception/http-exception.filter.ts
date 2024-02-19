import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";
import {Request, Response} from "express";
import {ErrorCodes} from "./error.enum";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let errorCode = ErrorCodes.SYS_ERROR_001;
    let errorMessage = "";
    if (typeof exceptionResponse === "string") {
      errorMessage = exceptionResponse;
    } else if (typeof exceptionResponse === "object") {
      errorCode = exceptionResponse["errorCode"];
      errorMessage = exceptionResponse["errorMessage"];
    }

    const body = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: {
        errorCode: errorCode,
        errorMessage: errorMessage,
      },
    };

    response.status(status).json(body);
  }
}
