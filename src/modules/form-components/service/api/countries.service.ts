import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CountriesHttpService, ICountryHttpResponse } from './http/countries.http.service';
import { Country } from '../../model/country';
import { Region } from '../../model/region';

import { LoggerService } from '../../../logging';

/**
 * @whatItDoes Provides methods that expose the remote API service calls permitting the Developer
 * to retrieve a list of Countries that can be used on a policy quotation.
 *
 * @howToUse
 *
 * To use, inject CountriesService into your component class. You can then call its methods
 * directly.
 */
@Injectable()
export class CountriesService {

  constructor(
    private countries: CountriesHttpService,
    private logger: LoggerService
  ) { }

  /**
   * Provides a list of {@link Countries} as an Observable instance
   */
  list(): Observable<Country[]> {
    this.logger.info(this, `Retrieving countries list from HTTP service.`);
    return this.countries.list()
      .map(r => {
        this.logger.info(this, 'Successfully retrieved list of Countries, now parsing');
        return r;
      })
      .map((response: ICountryHttpResponse[]) =>
        response.map(c => new Country(Number(c.id), c.name, c.region ? new Region(Number(c.region.id), c.region.name) : null )))
      .map(r => {
        this.logger.info(this, 'Successfully parsed list of Countris');
        return r;
      });
  }
}
