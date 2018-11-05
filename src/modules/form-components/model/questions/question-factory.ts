import { Injectable } from '@angular/core';

import { IFormQuestionOptions } from './form-question-option.interface';
import { CountryQuestion, ICountryQuestionOptions } from './country-question';
import { DateQuestion, IDateQuestionOptions } from './date-question';
import { TravellerQuestion, ITravellerQuestionOptions } from './traveller-question';
import { TravellerQuestionItem, ITravellerQuestionItemOptions } from './traveller-question-item';
import { FormQuestion } from './form-question';

import { LoggerService } from '../../../logging';

@Injectable()
export class QuestionFactory<T> {

    constructor(
        private logger: LoggerService
    ) {}

    public create(options: any): FormQuestion<any> {
        this.logger.info(this, `Generating FormQuestion for '${options.controlType}'.`);
        switch (options.controlType) {
            case 'country':
                return new CountryQuestion(<ICountryQuestionOptions>options);
            case 'date-select':
                return new DateQuestion(<IDateQuestionOptions>options);
            case 'travellers-list':
                const q: TravellerQuestion = new TravellerQuestion(<ITravellerQuestionOptions>options);
                if ((<ITravellerQuestionOptions>options).childControl) {
                    q.setChild(this.create((<ITravellerQuestionOptions>options).childControl));
                }
                return q;
            case 'travellers-list-item':
                return new TravellerQuestionItem(<ITravellerQuestionItemOptions>options);
            default:
                return new FormQuestion(options);
        }
    }
}
