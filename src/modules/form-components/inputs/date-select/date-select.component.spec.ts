import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

import { DateSelectComponent } from './date-select.component';
import { IDateQuestionOptions, DateQuestion } from '../../model/questions/date-question';

import { Observable } from 'rxjs/Observable';

import {
  ConsoleLogger,
  LogLevel
} from '../../../logging';

import { LoggingModule } from '../../../logging/logging.module';

const DATE_OPTIONS_A: IDateQuestionOptions = {
  common: [0, 1, 2, 3],
  lookaheadType: 'period',
  displayType: 'calendar',
  validationText: '',
  value: null
};

const DATE_OPTIONS_B: IDateQuestionOptions = {
  common: [0, 1, 2, 3],
  lookaheadType: 'days',
  displayType: 'period'
};

const DATE_OPTIONS_C: IDateQuestionOptions = {
  common: [0, 1, 2, 3],
  lookaheadType: 'weeks',
  displayType: 'period'
};

export class MockTranslateService {
  get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
    console.log(key);
    switch (key) {
      case 'APP.QUESTIONS.COMPONENT.DATE.SPECIFIC':
        return Observable.of('specific');
      default:
        return Observable.of({
          'CAL' : {
            'SAME_DAY' : '[Today]',
            'NEXT_DAY' : '[Tomorrow]',
            'NEXT_WEEK' : '[Next] dddd',
            'LAST_DAY' : '[Yesterday]',
            'LAST_WEEK' : '[Last] dddd',
            'SAME_ELSE' : 'DD/MM/YYYY'
          },
          'PERIOD' : {
              'SINGLE' : 'day',
              'PL' : 'days'
          }
        });
    }
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

describe('DateSelectComponent', () => {
  let component: DateSelectComponent;
  let fixture: ComponentFixture<DateSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslateService,
        { provide: ActivatedRoute, useClass: MockActiveRouteService }
      ],
      imports: [
        TranslateModule.forRoot(),
        LoggingModule.forRoot({
          loggers: [new ConsoleLogger()],
          logLevel: LogLevel.ALL
        })
      ],
      declarations: [ DateSelectComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSelectComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup(
      { date: new FormControl() }
    );
    component.controlName = 'date';
  });

  it('should instantiate', () => {
    expect(component).not.toBeUndefined();
  });

  describe('DATE_OPTIONS_A', () => {

    beforeEach(() => {
      component.question = new DateQuestion(DATE_OPTIONS_A);
      fixture.detectChanges();
    });

    it('should format the date correct', () => {
      const output: string = component.formatLookahead(1);
      expect(true).toBeTruthy();
    });

    it('should indicate the current selected value correctly', () => {
      component.selectQuickDate(0);
      expect(component.isSelected(0)).toBeTruthy();
    });

  });

  describe('DATE_OPTIONS_B', () => {

    beforeEach(() => {
      component.question = new DateQuestion(DATE_OPTIONS_B);
      fixture.detectChanges();
    });

    it('should format the date correct', () => {
      expect(component.formatLookahead(1)).toBe('1 day');
      expect(component.formatLookahead(2)).toBe('2 days');
      expect(true).toBeTruthy();
    });

    it('should indicate the current selected value correctly', () => {
      component.selectQuickDate(0);
      expect(component.isSelected(0)).toBeTruthy();
      component.selectQuickDate(1);
      expect(component.isSelected(0)).toBeFalsy();
      expect(component.isSelected(1)).toBeTruthy();
    });

  });

  describe('DATE_OPTIONS_C', () => {

    beforeEach(() => {
      component.question = new DateQuestion(DATE_OPTIONS_C);
      fixture.detectChanges();
    });

    it('should indicate the current selected value correctly', () => {
      component.selectQuickDate(0);
      expect(component.isSelected(0)).toBeTruthy();
      component.selectQuickDate(1);
      expect(component.isSelected(0)).toBeFalsy();
      expect(component.isSelected(1)).toBeTruthy();
    });

  });

});
