import { Injectable, Optional } from '@angular/core';
import { ILogger } from './logger/logger.interface';
import { environment } from '../../environments/environment';
import { LoggingConfig } from './logging.config';
import { LogLevel } from './loglevel.enum';

@Injectable()
export class LoggerService {

  private _loggers: ILogger[] = [];
  private _level = 1;

  get loggers(): ILogger[] {
    return this._loggers;
  }

  constructor(@Optional() options: LoggingConfig) {
    if (options) {
      if (options.loggers) {
        options.loggers.forEach(v => this.addLogger(v));
      }
      if (options.logLevel) {
        this.setLogLevel(options.logLevel);
      } else {
        this.setLogLevel(LogLevel.ALL);
      }
    }
  }

  addLogger(logger: ILogger): void {
    this.loggers.push(logger);
  }

  removeLogger(logger: ILogger): void {
    this._loggers = this._loggers.splice(this._loggers.indexOf(logger), 0);
  }

  private execute(name: string, source: any, ...args): void {
    this._loggers.forEach(v => {
      if (v[name]) {
        try {
          v[name](source, args);
        } catch (e) {
          const err: Error = (<Error>e);
          console.error(`[${name}] Attempted log using method '${name}' but got error. ${e} \n ${err.stack}`);
        }
      } else {
        console.warn(`[${name}] Attempted to log using method '${name}' but method does not exist.`);
      }
    });
  }

  public log(source: any, ...args): void {
    if (this.hasLogLevel(LogLevel.LOG)) {
      this.execute('log', source, args);
    }
  }

  public warn(source: any, ...args): void {
    if (this.hasLogLevel(LogLevel.WARN)) {
      this.execute('warn', source, args);
    }
  }

  public info(source: any, ...args): void {
    if (this.hasLogLevel(LogLevel.INFO)) {
      this.execute('info', source, args);
    }
  }

  public error(source: any, ...args): void {
    if (this.hasLogLevel(LogLevel.ERROR)) {
      this.execute('error', source, args);
    }
  }

  public clear(...args): void {
    this._loggers.forEach(v => {
      v.clear();
    });
  }

  public setLogLevel(level: number): void {
    this._level = level;
  }

  private hasLogLevel(level: number): boolean {
    return (this._level & level) === level;
  }
}
