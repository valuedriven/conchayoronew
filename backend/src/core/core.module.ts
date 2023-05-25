import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { AppLoggerService } from './logger.service';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    AppLoggerService,
  ],
  exports: [AppLoggerService],
})
export class CoreModule {}
