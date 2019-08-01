import {TestBed} from "@angular/core/testing";

import {SearchQueryHistoryService} from "./search-query-history.service";

describe('SearchQueryHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchQueryHistoryService = TestBed.get(SearchQueryHistoryService);
    expect(service).toBeTruthy();
  });
});
