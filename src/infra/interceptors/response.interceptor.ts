import {
  CallHandler,
  ExecutionContext,
  HttpException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((response) => {
        if (
          response?.status &&
          response.status !== 200 &&
          response.status != 'ok'
        ) {
          throw new HttpException({ reason: response }, response.status);
        }
      }),
    );
  }
}
