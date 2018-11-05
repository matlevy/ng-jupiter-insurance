import { TestBed, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Region } from '../../model/region';
import { RegionsService } from './regions.service';
import { RegionsHttpService } from './http/regions.http.service';

import {
  ConsoleLogger,
  LogLevel
} from '../../../logging';

import { LoggingModule } from '../../../logging/logging.module';

@Injectable()
export class MockRegionsHttpService {
  list(agentId: number, policyType?: number, campaign?: number): Observable<any[]> {
    return Observable.of([
      {id: '1', name: 'US'},
      {id: '2', name: 'Europe'},
    ]);
  }
}

describe('RegionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegionsService,
        { provide: RegionsHttpService, useClass: MockRegionsHttpService }
      ],
      imports: [
        LoggingModule.forRoot({
          loggers: [new ConsoleLogger()],
          logLevel: LogLevel.ALL
        })
      ]
    });
  });

  it('should be created', inject([RegionsService], (service: RegionsService) => {
    expect(service).toBeTruthy();
  }));

  it('correctly parse the response into objects', inject([RegionsService], (service: RegionsService) => {
    let result: Region[];
    service.list(1).subscribe(d => result = d);
    expect(result.length).toBe(2);
    expect(result[0].constructor.name).toBe('Region');
    expect(result[0].id).toBe(1);
    expect(result[0].name).toBe('US');
  }));
});
