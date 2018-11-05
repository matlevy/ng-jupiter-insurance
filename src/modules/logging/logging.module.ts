import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { LoggerService } from './logger.service';
import { ILogger } from './logger/logger.interface';
import { LoggingConfig } from './logging.config';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    LoggerService
  ],
  declarations: []
})
export class LoggingModule {
  public static forRoot(options: {
    loggers: any[],
    logLevel: number
  }): ModuleWithProviders {
    return {
      ngModule: LoggingModule,
      providers: [
        { provide: LoggingConfig,
          useValue: options
        }
    ]};
  }
}
