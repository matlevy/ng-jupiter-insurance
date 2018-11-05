import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { ErrorLoggingHttpService } from './error-logging-http.service';
import { FormConfigLoaderService } from '../../../modules/form-components/service/form-config-loader.service';
import { Subject } from 'rxjs/Subject';
import { Ng2DeviceDetectorModule, Ng2DeviceService } from 'ng2-device-detector';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';

export class MockConfigLoader {
  public loggingEndpoint: any = null;
  public config: Subject<any> = new Subject();
}

export class MockHttpClient {
  post(url: string, params: any): Observable<any> {
    return Observable.of({});
  }
}

describe('ErrorLoggingHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorLoggingHttpService,
        Ng2DeviceService,
        { provide: FormConfigLoaderService, useClass: MockConfigLoader },
        { provide: XHRBackend, useClass: MockBackend },
        { provide: HttpClient, useClass: MockHttpClient }
      ],
      imports: [
        Ng2DeviceDetectorModule,
        HttpModule
      ]
    });
  });

  it('should be created', inject([
      ErrorLoggingHttpService,
      FormConfigLoaderService,
      XHRBackend
    ], (service: ErrorLoggingHttpService, config: FormConfigLoaderService) => {
    expect(service).toBeTruthy();
  }));

  it('should post if the config is loaded', inject([
    ErrorLoggingHttpService,
    FormConfigLoaderService,
    XHRBackend
  ], (service: ErrorLoggingHttpService, config: FormConfigLoaderService) => {
    spyOn(config.config, 'asObservable').and.returnValue(v => Observable.of({}));
    service.report({
      agentId: 1,
      applicationName: null,
      errorReference: 'ff446622eeaa',
      location: 'location',
      logType: 'debug',
      message: 'This is a message',
      quoteNumber: '',
      userAgent: 'agent',
      userId: 'the user'
    }).subscribe();
    expect(config.config.asObservable).toHaveBeenCalled();
  }));

  it('should wait for the config to load before track if the config is not loaded',
    inject([
      ErrorLoggingHttpService,
      FormConfigLoaderService,
      XHRBackend
    ], (service: ErrorLoggingHttpService, config: FormConfigLoaderService) => {
    config.countriesEndpoint = 'blah';
    spyOn(config.config, 'asObservable').and.returnValue(v => Observable.of({}));
    expect(config.config.asObservable).not.toHaveBeenCalled();
  }));
});
