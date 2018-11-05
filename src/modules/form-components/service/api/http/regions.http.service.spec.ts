import { TestBed, inject } from '@angular/core/testing';

import { RegionsHttpService } from './regions.http.service';

xdescribe('RegionsHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegionsHttpService]
    });
  });

  it('should be created', inject([RegionsHttpService], (service: RegionsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
