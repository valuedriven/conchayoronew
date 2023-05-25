import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppLoggerService extends ConsoleLogger implements LoggerService {
  constructor(private readonly configService: ConfigService) {
    super();
  }
}
