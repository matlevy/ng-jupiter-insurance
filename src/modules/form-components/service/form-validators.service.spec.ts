import { TestBed, inject } from '@angular/core/testing';

import {
  FormValidatorsService
} from '../service';

import {
  ConsoleLogger,
  LogLevel
} from '../../logging';

import { LoggingModule } from '../../logging/logging.module';

describe('FormValidatorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormValidatorsService],
      imports: [
        LoggingModule.forRoot({
          loggers: [new ConsoleLogger()],
          logLevel: LogLevel.ALL
        })
      ]
    });
  });

  it('should be created', inject([FormValidatorsService], (service: FormValidatorsService) => {
    expect(service).toBeTruthy();
  }));
});
