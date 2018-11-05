import { Injectable } from '@angular/core';
import {
  Validators,
  FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/map';

import {
  FormQuestion,
  QuestionFactory
 } from '../../modules/form-components/model/questions';
import { Country } from '../../modules/form-components/model/country';
import { FormsHttpService } from '../../modules/form-components/service/forms.http.service';
import { LoggerService } from '../../modules/logging/logger.service';

/**
 * @whatItDoes Provides methods that expose models relating to Travel Quotation elements
 *
 * @howToUse
 *
 * To use, inject TravelQuotationService into your component class. You can then call its methods
 * directly.
 */
@Injectable()
export class TravelQuotationService {

  public detailsForm: FormGroup;

  constructor(
    private formsHttp: FormsHttpService,
    private questionFactory: QuestionFactory<any>,
    private translation: TranslateService,
    private logger: LoggerService
  ) { }

  /**
   * Requests the layout of the travel quotation form, returning an observable Observable. The success subject of the Obervable
   * will pass an Array of {@link FormQuestion} objects describing the questions that form part of the form.
   */
  public loadFormQuestions(): Observable<FormQuestion<any>[]> {
    this.logger.info(this, `Loading Form Questions for Travel Quotation.`);
    return this.formsHttp.get('quote-travel')
      .map( data => {
        this.logger.info(this, `Creating Questions for returned data`);
        const output: FormQuestion<any>[] = data.questions.map( (v) => {
          this.logger.info(this, `Creating '${v.controlType}' question for '${v.key}'.`);
          const question: FormQuestion<any> = this.questionFactory.create(v);
          this.localize(question, 'label');
          this.localize(question, 'validationText');
          return question;
        });
        this.logger.info(this, `Created Questions for returned data`);
        return output;
      });
  }

  public setBasicQuote(input: any): Observable<any> {
    return Observable.of(input);
  }

  private localize(input: any, key: string): void {
    this.logger.info(this, `Attempting to localize translation '${key}' for '${input.key}'`);
    if (input[key] && input[key].match(/\@\@[A-Za-z0-9\.]+\@\@/)) {
      const translationKey: string = input[key].match(/[A-Za-z0-9\.]+/)[0];
      this.translation.get(translationKey, {value: 'world'}).subscribe((res: string) => {
        input[key] = res;
        this.logger.info(this, `Got translation for '${input.key}', value is '${res}'`);
      });
    }
    if (!input[key]) {
      this.logger.warn(`Impossible to localise Question, cannot find key '${key}' within question`);
    }
  }

}
