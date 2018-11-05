import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { TravelQuotationService } from '../../service';

import { FormQuestion } from '../../../modules/form-components/model/questions/form-question';
import { FormGeneratorService } from '../../../modules/form-components/service/form-generator.service';
import { DynamicFormComponent } from '../../../modules/form-components/inputs/dynamic-form/dynamic-form.component';
import { LoggerService } from '../../../modules/logging/logger.service';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss']
})
export class DetailsFormComponent implements OnInit {

  /** A collection of th questions that are to be asked in the form. These will be provided by a Service at a later point */
  public questions: any[];

  @ViewChild('formComponent')
  public formComponent: DynamicFormComponent;

  @Output()
  public saved: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private service: TravelQuotationService,
    private logger: LoggerService
  ) {}

  public ngOnInit(): void {
    this.logger.info(this, `Initialising form and loading questions.`);
    this.questions = [];
    this.service.loadFormQuestions()
      .subscribe((d) => {
        this.logger.info(this, `Loaded form questions. ${d.length} loaded.`);
        this.questions = d;
      });
    this.formComponent.formReady.subscribe(
      d => (this.service.detailsForm = d)
    );
  }

  public sendDetailsData(value: any): void {
    this.logger.info(this, `Submitting form value: \n ${JSON.stringify(value)}`);
    this.service.setBasicQuote(value).subscribe(
      d => this.saved.emit(d)
    );
  }

}
