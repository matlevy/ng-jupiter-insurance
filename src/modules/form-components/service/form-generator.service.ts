import { Injectable } from '@angular/core';
import {
  Validators,
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
  ValidatorFn,
  AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { FormQuestion } from '../model/questions/form-question';
import { isArray } from 'util';

import { TravellersValidation } from '../inputs/travellers-list/travellers-validaton';
import { FormValidatorsService } from './form-validators.service';

import { LoggerService } from '../../logging/logger.service';

/**
 * @whatItDoes Provides methods that allow the Developer to transform {@link FormQuestion} instances into {@link FormGroup}
 * collections.
 *
 * @howToUse
 *
 * To use, inject FormGeneratorService into your component class. You can then call its methods
 * directly.
 */
@Injectable()
export class FormGeneratorService {

  constructor(
    private logger: LoggerService,
    private builder: FormBuilder,
    private validators: FormValidatorsService
  ) {}

  /**
   * Transforms a collection of {@link FormQuestion} instances into a collection of Reactive form {@link FormGroup}
   * instances.
   * @param questions Array of {@link FormQuestion} instances describing the structure of the form
   */
  public generateFormGroup(questions: FormQuestion<any>[]): FormGroup {
    const group: FormGroup = new FormGroup({});
    questions.forEach(question => {
      if (question.value !== undefined && isArray(question.value)) {
        group.addControl(question.key, this.builder.array([], this.validators.get(question.validators[0]) ));
        this.logger.info(this, `Added form array '${question.key}' to form group.`);
      } else {
        group.addControl(question.key, this.generateFormControl(question));
        this.logger.info(this, `Added form control '${question.key}' to form group.`);
      }
    });
    return group;
  }

  public generateControlValidators(question: FormQuestion<any>): ValidatorFn[] | ValidatorFn {
    const validators: ValidatorFn[] = [];
    for (const validator of question.validators) {
      this.logger.info(this, `Creating ${validator.toString()} validator for ${question.key}`);
      validators.push(this.validators.get(validator));
    }
    return validators;
  }

  /**
   * Transforms an individual {@link FormQuestion} instance into a {@link FormControl} instance.
   * @param question The {@link FormQuestion} instance
   */
  public generateFormControl(question: FormQuestion<any>): FormControl {
    return new FormControl(question.value || '', this.generateControlValidators(question));
  }
}
