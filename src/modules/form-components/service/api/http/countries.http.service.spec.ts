import { TestBed, inject } from '@angular/core/testing';

import { CountriesHttpService } from './countries.http.service';

xdescribe('Countries.HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountriesHttpService]
    });
  });

  it('should be created', inject([CountriesHttpService], (service: CountriesHttpService) => {
    expect(service).toBeTruthy();
  }));
});
