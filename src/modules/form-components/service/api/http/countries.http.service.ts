import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { FormConfigLoaderService } from '../../form-config-loader.service';

/** Interface describing the structure of the JSON response from the web service */
export interface ICountryHttpResponse {
  id: string;
  name: string;
  region: {
    id: string;
    name: string;
  };
}

@Injectable()
export class CountriesHttpService {

  constructor(
    private http: HttpClient,
    @Optional() private config: FormConfigLoaderService
  ) { }

  /** Returns an Observable of all Countries */
  list(): Observable<any> {
    return this.http.get<ICountryHttpResponse[]>(this.config.countriesEndpoint)
      .retry(3);
  }

}
