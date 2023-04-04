import { TestBed } from '@angular/core/testing';

import { ProjDataService } from './proj-data.service';

describe('ProjDataService', () => {
  let service: ProjDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
