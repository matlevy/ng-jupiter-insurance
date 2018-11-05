import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import {
  TranslateModule,
  TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { QuestionComponent } from './component/question/question.component';
import { SectionComponent } from './component/section/section.component';
import { DetailsFormComponent } from './forms/details-form/details-form.component';

import { AppFramesetComponent } from './component/app-frameset/app-frameset.component';
import { AppHeaderComponent } from './component/app-header/app-header.component';
import { AppFooterComponent } from './component/app-footer/app-footer.component';

import { LanguageSelectComponent } from './component/language-select/language-select.component';
import { LoggingModule } from '../modules/logging/logging.module';
import { environment } from '../environments/environment';
import { FormComponentsModule } from '../modules/form-components/form-components.module';
import {
  TravelQuotationService
} from './service';
import { FormConfigLoaderService } from '../modules/form-components/service/form-config-loader.service';
import { ErrorLoggingHttpService } from './service/http/error-logging-http.service';
import { Ng2DeviceDetectorModule, Ng2DeviceService } from 'ng2-device-detector';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/', '.lang.json');
}

export function createFormsConfigLoader(http: HttpClient) {
  return new FormConfigLoaderService(http, './assets/config/forms.config.json');
}

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    SectionComponent,
    DetailsFormComponent,
    AppFramesetComponent,
    AppHeaderComponent,
    AppFooterComponent,
    LanguageSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    LoggingModule.forRoot({
      loggers: environment.logger,
      logLevel: environment.logLevel
    }),
    FormComponentsModule.forRoot({
      loader: {
        provide: FormConfigLoaderService,
        useFactory: (createFormsConfigLoader),
        deps: [HttpClient]
      }
    }),
    Ng2DeviceDetectorModule
  ],
  providers: [
    TravelQuotationService,
    ErrorLoggingHttpService,
    Ng2DeviceService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
