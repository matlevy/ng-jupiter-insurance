import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  TranslateModule,
  TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CountrySelectComponent } from './inputs/country-select/country-select.component';
import { DateSelectComponent } from './inputs/date-select/date-select.component';
import { DynamicFormInputComponent } from './inputs/dynamic-form-input/dynamic-form-input.component';
import { DynamicFormComponent } from './inputs/dynamic-form/dynamic-form.component';
import { TravellersListComponent } from './inputs/travellers-list/travellers-list.component';
import { TravellersListItemComponent } from './inputs/travellers-list/travellers-list-item/travellers-list-item.component';

import { QuestionFactory } from './model/questions/question-factory';
import { TravellerFactory } from './model/traveller';

import { CountriesHttpService } from './service/api/http/countries.http.service';
import { CountriesService } from './service/api/countries.service';
import { ApiService } from './service/api/api.service';
import { RegionsHttpService } from './service/api/http/regions.http.service';
import { RegionsService } from './service/api/regions.service';

import {
  FormGeneratorService,
  FormsHttpService,
  FormValidatorsService
} from './service/';
import { FormComponentsConfig } from './form-components.config';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { FormConfigLoaderService } from './service/form-config-loader.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/', '.lang.json');
}

@NgModule({
  declarations: [
    DynamicFormInputComponent,
    DynamicFormComponent,
    TravellersListComponent,
    TravellersListItemComponent,
    CountrySelectComponent,
    DateSelectComponent
  ],
  exports: [
    DynamicFormInputComponent,
    DynamicFormComponent,
    TravellersListComponent,
    TravellersListItemComponent,
    CountrySelectComponent,
    DateSelectComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatStepperModule,
    MatCardModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatStepperModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatStepperModule,
    MatCardModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    HttpClientModule,
    MatStepperModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
        }
    }),
    BrowserAnimationsModule,
    NoopAnimationsModule,
  ],
  providers: [
    QuestionFactory,
    FormGeneratorService,
    FormValidatorsService,
    FormsHttpService,
    TravellerFactory,
    CountriesHttpService,
    CountriesService,
    RegionsHttpService,
    RegionsService,
    ApiService
  ]
})
export class FormComponentsModule {
  public static forRoot(options: FormComponentsConfig): ModuleWithProviders {
    return {
      ngModule: FormComponentsModule,
      providers: [options.loader]
    };
  }
}
