import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { environment } from '../environments/environment';

import { FormValidatorsService } from '../modules/form-components/service/form-validators.service';
import { TravellersValidation } from '../modules/form-components/inputs/travellers-list/travellers-validaton';
import { DetailsFormComponent } from './forms/details-form/details-form.component';
import { TravelQuotationService } from './service/travel-quotation.service';

import { LoggerService } from '../modules/logging';
import { FormConfigLoaderService } from '../modules/form-components/service/form-config-loader.service';
import { ErrorReportLogger } from './log/error-reporter.logger';
import { ErrorLoggingHttpService } from './service/http/error-logging-http.service';
import { Ng2DeviceService } from 'ng2-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('registrationComponent')
  public registrationComponent: DetailsFormComponent;

  @ViewChild('stepper')
  public stepper: MatHorizontalStepper;

  public isLinear = true;
  public form: FormGroup;

  private errorLogger: ErrorReportLogger;

  constructor(
    private logger: LoggerService,
    private validators: FormValidatorsService,
    private translate: TranslateService,
    private travelQuote: TravelQuotationService,
    private formsConfig: FormConfigLoaderService,
    private errorLogging: ErrorLoggingHttpService,
    private device: Ng2DeviceService,
    private change: ChangeDetectorRef
  ) {
    this.init();
  }

  protected init(): void {
    this.setupLogging();
    this.localise();
    this.registerValidators();
  }

  protected setupLogging() {
    this.errorLogger = new ErrorReportLogger(this.errorLogging, this.device);
    this.errorLogger.setOptions({
      agentId: this.formsConfig.agentId,
      applicationName: 'Jupiter',
      userId: 'guest',
      quoteNumber: ''
    });
    this.logger.addLogger(this.errorLogger);
    this.logger.error(this, 'test error');
  }

  protected registerValidators(): void {
    // TODO: Move to mudule for form controls????
    this.validators.register('hasAdults', TravellersValidation.containsAdults);
    this.validators.register('required', Validators.required);
    this.validators.register('email', Validators.email);
  }

  protected localise(): void {
    this.translate.addLangs(['en', 'fr']);
    this.translate.onLangChange.subscribe((lang) => {
      moment.locale(lang.lang);
    });
    this.translate.use('en');
  }

  public ngOnInit(): void {
    this.formsConfig.load();
    this.form = new FormGroup({
      travelDetails: new FormControl(null, Validators.required),
      quoteDetails: new FormControl(null, Validators.required)
    });
    this.change.detectChanges();
  }

  public processBasicDetails(details: any): void {
    this.form.get('travelDetails').setValue(details);
    this.errorLogger.setOption('location', details.destination);
    this.stepper.next();
  }
}
