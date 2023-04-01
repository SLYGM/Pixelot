import { TestBed } from '@angular/core/testing';

import { ImportWatcherService } from './import-watcher.service';

describe('ImportWatcherService', () => {
  let service: ImportWatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportWatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
