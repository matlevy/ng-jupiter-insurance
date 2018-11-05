import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelectComponent } from './language-select.component';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LoggingModule } from '../../../modules/logging/logging.module';
import { ConsoleLogger } from '../../../modules/logging/logger/console.logger';
import { LogLevel } from '../../../modules/logging/loglevel.enum';

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

describe('LanguageSelectComponent', () => {
  let component: LanguageSelectComponent;
  let fixture: ComponentFixture<LanguageSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageSelectComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActiveRouteService }
      ],
      imports: [
        TranslateModule.forRoot(),
        LoggingModule.forRoot({
          loggers: [new ConsoleLogger()],
          logLevel: LogLevel.ALL
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
