import { TestBed, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { CountriesService } from './countries.service';
import { CountriesHttpService } from './http/countries.http.service';

import { Country } from '../../model/country';

import {
  ConsoleLogger,
  LogLevel
} from '../../../logging';

import { LoggingModule } from '../../../logging/logging.module';

@Injectable()
export class MockCountriesHttpService {
  list(): Observable<any> {
    return Observable.of([
      {id: '1', name: 'United Kingdom'},
      {id: '2', name: 'USA'},
      {id: '2', name: 'USA', region: {id: '1', name: 'USA'}}
    ]);
  }
}

describe('CountriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CountriesService,
        { provide: CountriesHttpService, useClass: MockCountriesHttpService }
      ],
      imports: [
        LoggingModule.forRoot({
          loggers: [new ConsoleLogger()],
          logLevel: LogLevel.ALL
        })
      ]
    });
  });

  it('should be created', inject([CountriesService], (service: CountriesService) => {
    expect(service).toBeTruthy();
  }));

  it('should correctly parse the returned response as a collection of Country instances',
  inject([CountriesService], (service: CountriesService) => {
    let countries: Country[];
    service.list().subscribe(d => { countries = d; console.log(d); } );
    expect(countries.length).toBe(3);
    expect(countries[0].id).toBe(1);
    expect(countries[0].name).toBe('United Kingdom');
    expect(countries[2].region.name).toBe('USA');
  }));
});
