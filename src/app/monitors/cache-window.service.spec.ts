import { TestBed } from '@angular/core/testing';

import { CacheWindowService } from './cache-window.service';

describe('CacheWindowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CacheWindowService = TestBed.get(CacheWindowService);
    expect(service).toBeTruthy();
  });
});
