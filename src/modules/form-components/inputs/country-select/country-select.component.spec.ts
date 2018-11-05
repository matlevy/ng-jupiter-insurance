import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { CountrySelectComponent } from './country-select.component';
import { CountryQuestion, ICountryQuestionOptions } from '../../model/questions/country-question';
import { Region } from '../../model/region';
import { Country } from '../../model/country';
import {
  RegionsService,
  CountriesService } from '../../service';

import {
  ConsoleLogger,
  LogLevel
} from '../../../logging';

import { LoggingModule } from '../../../logging/logging.module';

@Injectable()
export class MockCountryService {
  list(): Observable<Country[]> {
    return Observable.of([
      new Country(1, 'Jamaica', new Region(1, 'Carrib')),
      new Country(2, 'United States', new Region(1, 'US')),
    ]);
  }
}

export class MockRegionService {
  list(): Observable<Region[]> {
    return Observable.of([
      new Region(1, 'United States'),
      new Region(2, 'Europe')
    ]);
  }
}

export class MockTranslateService {
  get(key: string): Observable<any> {
    return Observable.of({});
  }
}

export class MockActiveRouteService {
  constructor() {}
  queryParams: Observable<any> = Observable.of({});
  get snapshot(): any {
    const queryParams: any = {};
    return {
      queryParams: Observable.of(queryParams)
    };
  }
}

describe('CountrySelectComponent', () => {
  let component: CountrySelectComponent;
  let fixture: ComponentFixture<CountrySelectComponent>;

  const COUNTRY_QUESTION: ICountryQuestionOptions = {
      key: 'TheCountry',
      value: null,
      countries: [],
      regions: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CountrySelectComponent
      ],
      providers: [
        { provide: CountriesService, useClass: MockCountryService },
        { provide: RegionsService, useClass: MockRegionService },
        { provide: ActivatedRoute, useClass: MockActiveRouteService }
      ],
      imports: [
        MatAutocompleteModule,
        TranslateModule.forRoot(),
        LoggingModule.forRoot({
          loggers: [new ConsoleLogger()],
          logLevel: LogLevel.ALL
        })
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySelectComponent);
    component = fixture.componentInstance;
    component.question = new CountryQuestion(COUNTRY_QUESTION);
    component.group = new FormGroup(
      { country: new FormControl() }
    );
    component.controlName = 'country';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the value of the FormControl when selecting a country', () => {
    const region: Region = new Region(1, 'US');
    const country: Country = new Country(1, 'Jamaica', region);
    component.selectCountry(country);
    expect(component.group.controls['country'].value).not.toBeNull();
    expect(component.group.controls['country'].value.country).toBe(country);
    expect(component.group.controls['country'].value.region).toBe(region);
  });

  it('should change the value of the FormControl when selecting a region', () => {
    const region: Region = new Region(1, 'US');
    component.selectRegion(region);
    expect(component.group.controls['country'].value).not.toBeNull();
    expect(component.group.controls['country'].value.country).toBeNull();
    expect(component.group.controls['country'].value.region).toBe(region);
  });

  it('should inititialise the countries and region values on initialisation', () => {
    component.ngOnInit();
    expect(component.question.countries.length).toBe(2);
    expect(component.question.regions.length).toBe(2);
  });

});
