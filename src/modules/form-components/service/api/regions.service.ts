import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RegionsHttpService, IRegionsHttpResponse } from './http/regions.http.service';
import { Region } from '../../model/region';
import { LoggerService } from '../../../logging';

@Injectable()
export class RegionsService {

  constructor(
    private http: RegionsHttpService,
    private logger: LoggerService
  ) { }

  /**
   * Returns an Observable providing a list of Regions as requested by the regions HTTP service.
   * These will be parsed into typed objects for use in the subscribe function of the returned
   * Obsrevable.
   * 
   * @param agentId The remote ID of the agent
   * @param policyType The ID of the policy type
   * @param campaign The campaign ID
   */
  public list(agentId: number, policyType?: number, campaign?: number): Observable<Region[]> {
    this.logger.info(this, `Requesting Regions list from HTTP service.`);
    return this.http.list(agentId, policyType, campaign)
      .map(r => {
        this.logger.info(this, 'Successfully retrieved list of Regions, now parsing');
        return r;
      })
      .map((response: IRegionsHttpResponse[]) => response.map(d => new Region(Number(d.id), d.name)))
      .map(r => {
        this.logger.info(this, 'Successfully parsed list of Regions.');
        return r;
      });
  }
}
