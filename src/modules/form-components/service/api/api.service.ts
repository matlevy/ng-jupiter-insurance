import { Injectable } from '@angular/core';
import { CountriesService } from './countries.service';
import { PolicyTypeService } from './policy-type.service';
import { RegionsService } from './regions.service';

@Injectable()
export class ApiService {

  constructor(
    public countries: CountriesService,
    public policyType: PolicyTypeService,
    public regions: RegionsService
  ) { }

}
