import { TestBed, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { TravelQuotationService } from './travel-quotation.service';

import { FormsHttpService } from '../../modules/form-components/service/forms.http.service';
import { IFormConfig } from '../../modules/form-components/config/form-config.interface';
import { FormQuestion } from '../../modules/form-components/model/questions/form-question';
import { QuestionFactory } from '../../modules/form-components/model/questions/question-factory';

import { LoggingModule } from '../../modules/logging/logging.module';
import { ConsoleLogger } from '../../modules/logging/logger/console.logger';
import { LogLevel } from '../../modules/logging/loglevel.enum';

@Injectable()
export class MockFormsHttpService {
  get(name: string): Observable<IFormConfig> {
    return Observable.of(MOCK_RESPONSE);
  }
}

@Injectable()
export class MockQuestionFactory {
  create(options: any): FormQuestion<any> {
    return new FormQuestion();
  }
}

const MOCK_RESPONSE: IFormConfig = {
  questions: [
    { key: 'key', value: 'value'},
    { key: 'key', value: 'value'},
    { key: 'key', value: 'value'}
  ]
};

const MOCK_DATA: FormQuestion<any>[] = [
  new FormQuestion(),
  new FormQuestion(),
  new FormQuestion()
];

describe('TravelQuotationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TravelQuotationService,
        { provide: FormsHttpService, useClass: MockFormsHttpService },
        { provide: QuestionFactory, useClass: MockQuestionFactory },
        TranslateService
      ],
      imports: [
        TranslateModule.forRoot(),
        LoggingModule.forRoot({
          loggers: [new ConsoleLogger()],
          logLevel: LogLevel.ALL
        })
      ]
    });
  });

  it('should be created', inject([TravelQuotationService], (service: TravelQuotationService) => {
    expect(service).toBeTruthy();
  }));

  describe('loadFormQuestions', () => {
    it('should return an Observable', inject([TravelQuotationService], (service: TravelQuotationService) => {
      expect(service.loadFormQuestions().constructor.name).toBe('Observable');
    }));
    it('should return the correct data in the Observable success callback',
    inject([
      TravelQuotationService,
      FormsHttpService
    ], (
      service: TravelQuotationService,
      formsHttp: FormsHttpService
    ) => {
      const loadObserver: any = {
        success: (data) => {
          return MOCK_DATA;
        }
      };
      spyOn(loadObserver, 'success');
      service.loadFormQuestions().subscribe(loadObserver.success);
      expect(loadObserver.success).toHaveBeenCalled();
    }));
    it('should make a request to the http service for the form',
      inject([
        TravelQuotationService,
        FormsHttpService
      ], (
        service: TravelQuotationService,
        formsHttp: FormsHttpService
      ) => {
        spyOn(formsHttp, 'get').and.returnValue(Observable.of(MOCK_RESPONSE));
        service.loadFormQuestions();
        expect(formsHttp.get).toHaveBeenCalled();
      }));
    it('should transform the result of the http form correctly',
      inject([
        TravelQuotationService,
        FormsHttpService
      ], (
        service: TravelQuotationService,
        formsHttp: FormsHttpService
      ) => {
        let result: any = null;
        const observer: any = {
          done: (d) => {
            result = d;
          }
        };
        service.loadFormQuestions().subscribe(observer.done);
        expect(result.length).toBe(3);
        expect(result[0].constructor.name).toBe('FormQuestion');
      }));
  });
});
