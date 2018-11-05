import { TestBed, inject } from '@angular/core/testing';

import { PolicytypeHttpService } from './policytype.http.service';

xdescribe('PolicytypeHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolicytypeHttpService]
    });
  });

  it('should be created', inject([PolicytypeHttpService], (service: PolicytypeHttpService) => {
    expect(service).toBeTruthy();
  }));
});
