import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';

import { IFormConfig } from '../config/form-config.interface';

import { LoggerService } from '../../logging';

/**
 * @whatItDoes Provides methods that expose request to make load form configuration files
 *
 * @howToUse
 *
 * To use, inject FormsHttpService into your component class. You can then call its methods
 * directly.
 */
@Injectable()
export class FormsHttpService {

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) { }

  /**
   * Makes a request to retrieve a configuration file for a quotation form. Configurations
   * should be located in the '/assets/config/' folder and follow the {@link IFormConfig}
   * interface.
   * @param name The name of the confiuration file suffixed by '.form.json'
   */
  public get(name: string): Observable<IFormConfig> {
    this.logger.info(this, `Retrieving form configuration for '${name}'.`);
    return this.http.get<IFormConfig>('/assets/config/'.concat(name).concat('.form.json'))
      .map(v => {
        this.logger.info(this, `loaded form configuration for '${name}'.`);
        return v;
      })
      .retry(3);
  }
}
