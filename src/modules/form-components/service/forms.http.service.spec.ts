import { TestBed, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormsHttpService } from './forms.http.service';
import { Observable } from 'rxjs/Observable';

import {
  ConsoleLogger,
  LogLevel
} from '../../logging';

import { LoggingModule } from '../../logging/logging.module';

@Injectable()
export class MockHttpClient {
  get(url: string) {
    return Observable.of({});
  }
}

describe('Forms.HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormsHttpService,
        { provide: HttpClient, useClass: MockHttpClient }
      ],
      imports: [
        LoggingModule.forRoot({
          loggers: [new ConsoleLogger()],
          logLevel: LogLevel.ALL
        })
      ]
    });
  });

  it('should be created', inject([FormsHttpService], (service: FormsHttpService) => {
    expect(service).toBeTruthy();
  }));

  describe('get', () => {
    it('should make a http get request via http services',
      inject([
        HttpClient,
        FormsHttpService
      ], (
        httpClient: HttpClient,
        service: FormsHttpService
      ) => {
        spyOn(httpClient, 'get').and.returnValue(Observable.of({}));
        service.get('');
        expect(httpClient.get).toHaveBeenCalled();
      })
    );
  });
});
