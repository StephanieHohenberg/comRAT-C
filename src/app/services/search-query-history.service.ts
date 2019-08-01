import {Injectable} from "@angular/core";
import {SearchQuery} from "../models/searchQuery.data";
import {Subject} from "rxjs/index";

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
  }


  public addQueryOfWords(words: string[]): void {
    this.hasQueriesSubject.next(true);
    this.searchQueries.push(new SearchQuery(words));
  }


}
