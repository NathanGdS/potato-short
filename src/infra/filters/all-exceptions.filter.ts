import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Injectable()
@Catch()
export class AllExceptionsFilterService implements ExceptionFilter {
  constructor(
    @Inject(HttpAdapterHost)
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const isHttpException = exception instanceof HttpException;

    if (isHttpException) {
      httpAdapter.reply(
        ctx.getResponse(),
        exception.getResponse(),
        exception.getStatus(),
      );
      return;
    }
    let statusCode, message;

    if ('response' in exception) {
      statusCode =
        (exception.response.data.statusCode || exception.response.status) ??
        HttpStatus.BAD_REQUEST;
      message = exception.response.data.message || exception.response.data;
    } else {
      statusCode = exception.status || HttpStatus.BAD_REQUEST;
      message = exception.message;
    }
    const errorBody = {
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      requestBody: ctx.getRequest().body ?? null,
      response: message,
      at: exception.stack,
    };
    // statusCode = 200;
    // this.logger.error(exception, JSON.stringify(errorBody));
    httpAdapter.reply(ctx.getResponse(), errorBody, statusCode);
  }
}
