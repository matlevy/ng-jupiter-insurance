import { TestBed, inject } from '@angular/core/testing';

import { ApiHttpService } from './api-http.service';

xdescribe('ApiHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiHttpService]
    });
  });

  it('should be created', inject([ApiHttpService], (service: ApiHttpService) => {
    expect(service).toBeTruthy();
  }));
});
