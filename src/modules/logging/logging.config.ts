import { environment } from '../../environments/environment';

export class LoggingConfig {
    loggers: any[] = environment.logger;
    logLevel: number = environment.logLevel;
}
