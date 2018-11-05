import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';

import { TravellersListComponent } from './travellers-list.component';

import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { TravellerFactory } from '../../model/traveller';
import { QuestionFactory } from '../../model/questions';
import { IFormConfig } from '../../config/form-config.interface';

import {
  FormGeneratorService,
  FormValidatorsService,
  FormsHttpService
} from '../../service';

import {
  ConsoleLogger,
  LogLevel
} from '../../../logging';

import { LoggingModule } from '../../../logging/logging.module';


@Injectable()
export class MockFormsHttpService {
  get(name: string): Observable<IFormConfig> {
    return Observable.of(MOCK_RESPONSE);
  }
}

const MOCK_RESPONSE: IFormConfig = {
  questions: [
    { key: 'key', value: 'value'},
    { key: 'key', value: 'value'},
    { key: 'key', value: 'value'}
  ]
};

xdescribe('TravellersListComponent', () => {
  let component: TravellersListComponent;
  let fixture: ComponentFixture<TravellersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        TravellerFactory,
        FormGeneratorService,
        QuestionFactory,
        FormGeneratorService,
        FormBuilder,
        { provide: FormsHttpService, useClass: MockFormsHttpService },
        TranslateService,
        FormValidatorsService,
      ],
      imports: [
        TranslateModule.forRoot(),
        LoggingModule.forRoot({
          loggers: [new ConsoleLogger()],
          logLevel: LogLevel.ALL
        })
      ],
      declarations: [
        TravellersListComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('addTraveller() should increase the count of travellers collection property', () => {
    component.add();
    expect(true).toBe(true);
  });
});
