import { TestBed } from '@angular/core/testing';

import { SceneDataService } from './scene-data.service';

describe('SceneDataService', () => {
  let service: SceneDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SceneDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
