import { Injectable } from '@angular/core';
import { PolicytypeHttpService } from './policytype.http.service';
import { CountriesHttpService } from './countries.http.service';
import { RegionsHttpService } from './regions.http.service';

@Injectable()
export class ApiHttpService {

  constructor(
    public policyType: PolicytypeHttpService,
    public countries: CountriesHttpService,
    public regions: RegionsHttpService
  ) { }

}
