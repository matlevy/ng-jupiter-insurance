import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

import {
  LoggerService
} from '../../logging';

@Injectable()
export class FormValidatorsService {

  private _validators: Map<string, ValidatorFn> = new Map();

  constructor(
    private logger: LoggerService
  ) { }

  public register(name: string, validator: ValidatorFn) {
    this.logger.info(this, `Registering Form Validator ${name}.`);
    this._validators.set(name, validator);
  }

  public get(name): ValidatorFn {
    this.logger.info(this, `Retrieving Form Validator for '${name}'.`);
    return this._validators.get(name);
  }

}
