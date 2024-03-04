import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpClientService {
  constructor(private readonly httpService: HttpService) {}

  get<T>(url: string, headers?: Record<string, string>) {
    return this.httpService
      .get<T>(url, { headers })
      .pipe(map((response) => response.data));
  }

  post<T>(url: string, data: any, headers?: Record<string, string>) {
    return this.httpService
      .post<T>(url, data, { headers })
      .pipe(map((response) => response.data));
  }
  // post, put, delete 등의 메소드도 유사한 방식으로 구현 가능
}
