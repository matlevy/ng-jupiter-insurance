import { IFormQuestionOptions } from './form-question-option.interface';
import { isArray } from 'util';

export class FormQuestion<T> {
  value: T;
  key: string;
  label: string;
  validationText: string;
  order: number;
  controlType: string;
  questions: IFormQuestionOptions<any>[];
  validators: string[];

  constructor(options: IFormQuestionOptions<T> = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.validationText = options.validationText;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.questions = options.questions || null;
    this.validators = options.validators || [];
    if (options.value && isArray(options.value) && options.controlType == null) {
      console.warn(options.key.concat(' is flagged as having childen but no control type for the question was defined '));
    }
  }
}
