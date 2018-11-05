import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PolicytypeHttpService {

  constructor(
    private http: HttpClient
  ) { }

  list(type: number): Observable<any> {
    return this.http.get('http://europa.thefrontfelloff.com/api/policytype/'.concat(type.toString()))
      .retry(3);
  }
}
