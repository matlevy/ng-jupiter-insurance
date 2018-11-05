import { TestBed, inject } from '@angular/core/testing';

import { PolicyTypeService } from './policy-type.service';

xdescribe('PolicyTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolicyTypeService]
    });
  });

  it('should be created', inject([PolicyTypeService], (service: PolicyTypeService) => {
    expect(service).toBeTruthy();
  }));
});
