import {TestBed} from '@angular/core/testing';

import {SearchQueryHistoryService} from './search-query-history.service';

describe('SearchQueryHistoryService', () => {

  let service: SearchQueryHistoryService;
  beforeEach(() => {
    service = TestBed.get(SearchQueryHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add query', () => {
    expect(service.getSearchQueries().length).toBe(0);

    service.addQueryOfWords(['word1']);
    expect(service.getSearchQueries().length).toBe(1);
    expect(service.getSearchQueries()[0].words).toEqual(['word1']);

    service.addQueryOfWords(['word2, word3']);
    expect(service.getSearchQueries().length).toBe(2);
  });
});

