export interface IFormQuestionOptions<T> {
    value?: T;
    key?: string;
    label?: string;
    validationText?: string;
    order?: number;
    defaults?: any;
    children?: any[];
    controlType?: string;
    questions?: IFormQuestionOptions<any>[];
    validators?: string[];
}
