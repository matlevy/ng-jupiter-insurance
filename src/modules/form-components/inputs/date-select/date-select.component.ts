import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

import { DateQuestion } from '../../model/questions/date-question';
import { LoggerService } from '../../../../modules/logging';

/**
 * @whatItDoes Renders an input for the User to ba able to enter Date details. Given that there are a set of
 * common time periods entered in the {@link DateQuestion}, a series of chips (see Material Design) will be
 * rendered. As a Developer there is also the option to include an autocomplete component. Setting the others
 * parameter of the {@link DateQuestion} will render a Material Design auto-complete component.
 *
 * Chips within the component can be set to render either a time period (e.g. '1 days') or Moment calendar string.
 *
 * @howToUse
 *
 * To use, implement the selector within the section of the application providing a {@link TravellerQuestion},
 * {@link FormArray}, and {@link FormGroup} the FormArray is contained within. The TravellerQuestion must contain
 * a childControl property.
 */
@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['../../shared/shared.scss', '../shared/shared.scss', './date-select.component.scss']
})
export class DateSelectComponent implements OnInit {

  @Input()
  public question: DateQuestion;

  @Input()
  public group: FormGroup;

  @Input()
  public controlName: string;

  private calFormat: any = {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: '[Next] dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'DD/MM/YYYY'
  };

  private periodFormat: any = {
    single: 'day',
    plural: 'days'
  };

  public state = 'chips';

  constructor(
    public translations: TranslateService,
    private changeDetection: ChangeDetectorRef,
    private activeRoute: ActivatedRoute,
    private logger: LoggerService
  ) { }

  /**
   * Sets the value of the FormGroup to the date calculated from the lookahead value and its lookaheadType, for
   * example: if the lookaheadType is 'weeks' and the input is 1 then the value of the form will be 1 week ahead
   * of the current date.
   *
   * @param lookahead The value of the lookahead period to set the form control value to
   */
  public selectQuickDate(lookahead: number): void {
    const n = moment();
    const d = n.add((<any>lookahead), this.question.lookaheadType).toDate();
    this.logger.log(this, `Setting lookahead date for '${this.question.key}' to '${lookahead}'
      lookahead type is '${this.question.lookaheadType}', new value is '${d}'.`);
    this.group.controls[this.controlName].setValue(d);
  }

  /**
   * Given the lookaheadType value of the question instance, this function will return a string representing a period
   * of time ahead of the current date, for example: if the value is 1 and the lookAheadType is 'weeks' then the returned
   * value will be '1 weeks'.
   *
   * @param input Number representing the amount of time to lookahead when selecting the date
   */
  public formatLookahead(input: any): string {
    const n = moment().add(input, this.question.lookaheadType);
    switch (this.question.displayType) {
      case 'period':
        return [input, ' ', input > 1 ? this.periodFormat.plural : this.periodFormat.single].join('');
      default:
        return n.calendar(null, this.calFormat);
    }
  }

  /**
   * Given the lookaheadType, the function will check if the lookahead value matches the value of the form
   * control and return true or false.
   * @param lookahead The value of the lookahead days to check against
   */
  public isSelected(lookahead: number): boolean {
    if (this.group.controls[this.controlName].value === null) {
      return false;
    }
    const n = moment().add((<any>lookahead), this.question.lookaheadType);
    const v = moment(this.group.controls[this.controlName].value);
    return n.format('DD/MM/YYYY') === v.format('DD/MM/YYYY');
  }

  /** Changes the state value of the component */
  private chooseSpecificDate(): void {
    this.state = 'specific';
    this.group.controls[this.controlName].setValue(null);
  }

  public ngOnInit(): void {
    this.translations.onLangChange.subscribe(
      (d) => {
        this.updateLang();
        this.changeDetection.detectChanges();
      });
    this.activeRoute.queryParams.subscribe(
      (d) => {
        const date: any = d[this.question.key];
        if (date) {
          this.logger.info(this, `Got date from query parameter ${this.question.key}`);
          this.selectQuickDate(date);
        }
      }
    );
  }

  private updateLang(): void {
    this.logger.info(this, `Updating language translations.`);
    this.translations.get('APP.QUESTIONS.COMPONENT.DATE').subscribe(
      (val) => {
        this.logger.info(this, `Got language translations`);
        this.calFormat.sameDay = val.CAL.SAME_DAY;
        this.calFormat.nextDay = val.CAL.NEXT_DAY;
        this.calFormat.nextWeek = val.CAL.NEXT_WEEK;
        this.calFormat.lastDay = val.CAL.LAST_DAY;
        this.calFormat.lastWeek = val.CAL.LAST_WEEK;
        this.calFormat.sameElse = val.CAL.SAME_ELSE;
        this.periodFormat.single = val.PERIOD.SINGLE;
        this.periodFormat.plural = val.PERIOD.PL;
      }
    );
  }

}
