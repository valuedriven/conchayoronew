import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppLoggerService } from 'src/core/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  @Inject(AppLoggerService)
  private readonly logger: AppLoggerService;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const className = context.getClass().name;
    const handler = context.getHandler().name;
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.originalUrl;
    const message = `Handler: ${handler}. Method: ${method}. Resource: ${url}`;
    this.logger.log(message, className);
    return next
      .handle()
      .pipe(
        tap(() => this.logger.log(`After... ${Date.now() - now}ms`, className)),
      );
  }
}
