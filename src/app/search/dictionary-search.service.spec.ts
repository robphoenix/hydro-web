import { TestBed, inject } from '@angular/core/testing';

import { DictionarySearchService } from './dictionary-search.service';

describe('DictionarySearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DictionarySearchService]
    });
  });

  it('should be created', inject([DictionarySearchService], (service: DictionarySearchService) => {
    expect(service).toBeTruthy();
  }));
});
