import {Catch, RpcExceptionFilter} from '@nestjs/common';
import {RpcException} from '@nestjs/microservices';
import {Observable, throwError} from 'rxjs';

@Catch(RpcException)
export class MicroserviceRpcExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException): Observable<any> {
    return throwError(() => exception.getError());
  }
}
