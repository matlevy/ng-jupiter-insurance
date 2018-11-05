import { FormQuestion } from './form-question';
import { Traveller, ITraveller } from '../traveller';
import { IFormQuestionOptions } from './form-question-option.interface';
import { ITravellerQuestionItemOptions } from './traveller-question-item';

export interface ITravellerQuestionOptions extends IFormQuestionOptions<ITraveller[]> {
  maxTravellers?: number;
  minTravellers?: number;
  value?: ITraveller[];
  childControl?: ITravellerQuestionItemOptions;
}

export class TravellerQuestion extends FormQuestion<Traveller[]> {
  public controlType = 'travellers-list';
  public type: string;
  public maxTravellers: number;
  public minTravellers: number;
  public value: Traveller[];
  public childControl: FormQuestion<Traveller>;

  constructor(options: {} = {}) {
      super(options);
      this.maxTravellers = options['maxTravellers'] || 1;
      this.minTravellers = options['minTravellers'] || 0;
      this.value = options['value'] || [];
  }

  setChild(question: FormQuestion<Traveller>): void {
    this.childControl = question;
  }
}
