import { FormQuestion } from './form-question';
import { IFormQuestionOptions } from './form-question-option.interface';

export interface IDateQuestionOptions extends IFormQuestionOptions<Date> {
  common: number[];
  lookaheadType: string;
  displayType: string;
}

export class DateQuestion extends FormQuestion<string> {
  public controlType = 'date-select';
  public type: string;
  public common: number[];
  public lookaheadType: string;
  public displayType: string;
  constructor(options: IDateQuestionOptions) {
      super(<IFormQuestionOptions<any>>options);
      this.common = options['common'] || [];
      this.lookaheadType = options['lookaheadType'] || 'days';
      this.displayType = options['displayType'] || 'calendar';
  }
}
