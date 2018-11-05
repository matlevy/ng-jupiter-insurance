import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { FormConfigLoaderService } from '../../form-config-loader.service';

export interface IRegionsHttpResponse {
  id: string;
  name: string;
}

@Injectable()
export class RegionsHttpService {

  constructor(
    private http: HttpClient,
    @Optional() private config: FormConfigLoaderService
  ) { }

  /** Returns and Observable of regions */
  list(agentId: number, policyType?: number, campaign?: number): Observable<any> {
    if (!this.config.local) {
      let path = this.config.regionsEndpoint.concat(agentId.toString());
      path += (policyType ? '/'.concat(policyType.toString()) : '');
      path += (policyType && campaign ? '/'.concat(campaign.toString()) : '');
      return this.http.get<IRegionsHttpResponse[]>(path).retry(3);
    } else {
      const pathLocal = this.config.regionsEndpoint;
      return this.http.get<IRegionsHttpResponse[]>(pathLocal).retry(3);
    }
  }
}
