import {Injectable} from '@angular/core';
import {SearchQuery} from '../models/searchQuery.data';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchQueryHistoryService {

  private hasQueriesSubject: Subject<boolean> = new Subject();
  private searchQueries: SearchQuery[] = [];

  constructor() {
  }

  public getSearchQueries(): SearchQuery[] {
    return this.searchQueries;
  }

  public getHasQueriesSubject(): Subject<boolean> {
    return this.hasQueriesSubject;
    // TODO Observable ?  + next testing
  }


  public addQueryOfWords(words: string[]): void {
    if (this.searchQueries.length === 1) {
      this.hasQueriesSubject.next(true);
    }
    this.searchQueries = [...this.searchQueries, new SearchQuery(words)];
  }


}
