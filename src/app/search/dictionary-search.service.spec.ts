import { TestBed, inject } from '@angular/core/testing';

import { DictionarySearchService } from './dictionary-search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DictionarySearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DictionarySearchService],
    });
  });

  it('should be created', inject(
    [DictionarySearchService],
    (service: DictionarySearchService) => {
      expect(service).toBeTruthy();
    },
  ));
});
