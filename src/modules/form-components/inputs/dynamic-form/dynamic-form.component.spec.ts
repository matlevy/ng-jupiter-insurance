import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { DynamicFormComponent } from './dynamic-form.component';

import {
  ConsoleLogger,
  LogLevel
} from '../../../logging';

import { LoggingModule } from '../../../logging/logging.module';

xdescribe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslateService
      ],
      imports: [
        TranslateModule.forRoot(),
        LoggingModule.forRoot({
          loggers: [new ConsoleLogger()],
          logLevel: LogLevel.ALL
        })
      ],
      declarations: [ DynamicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
