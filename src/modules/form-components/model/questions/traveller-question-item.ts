import { FormQuestion } from './form-question';
import { Traveller, ITraveller } from '../traveller';
import { IFormQuestionOptions } from './form-question-option.interface';

export interface ITravellerQuestionItemOptions extends IFormQuestionOptions<ITraveller> {
  value?: ITraveller;
  childControl?: IFormQuestionOptions<ITraveller>;
}

export class TravellerQuestionItem extends FormQuestion<ITraveller> {
  public controlType = 'travellers-list-item';
  public type: string;
  public value: ITraveller;
  public questions: any[];
  constructor(options: ITravellerQuestionItemOptions) {
    super(<IFormQuestionOptions<any>>options);
    this.value = options.value || {};
  }
}
