import { IFormQuestionOptions } from '../model/questions/form-question-option.interface';

export interface IFormConfig {
    questions: IFormQuestionOptions<any | any[]>[];
}
