import {Component, Input, OnInit} from "@angular/core";
import {SearchQuery} from "../../../models/searchQuery.data";
import {Router} from "@angular/router";
import {SearchQueryHistoryDialogComponent} from "../search-query-history-dialog.component";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-search-query-history-table',
  templateUrl: './search-query-history-table.component.html',
  styleUrls: ['./search-query-history-table.component.css']
})
export class SearchQueryHistoryTableComponent implements OnInit {

  @Input() public searchQueries: SearchQuery[];
  @Input() public colors: string[];
  public displayedQueries: SearchQuery[];

  constructor(private router: Router, public dialogRef: MatDialogRef<SearchQueryHistoryDialogComponent>) {
  }

  ngOnInit() {
    document.getElementById("table").focus();
    this.displayedQueries = Object.assign(this.searchQueries, {});
  }

  ngOnChanges() {
    this.displayedQueries = Object.assign(this.searchQueries, {});
    let searchText = (<HTMLInputElement>document.getElementById("queryFilter")).value;
    if (searchText != undefined && searchText.length > 0) {
      this.getFilteredData(searchText);
    }
  }

  public getFilteredData(searchText: string): void {
    this.displayedQueries = this.searchQueries.filter(
      (query: SearchQuery) => (query.words.findIndex(w => w.includes(searchText.toLowerCase())) > -1));
  }


  public selectQuery(query: SearchQuery): void {
    if (query.words.length === 1) {
      this.router.navigate(['words'], {queryParams: {w1: query.words[0]}});
    } else if (query.words.length === 2) {
      this.router.navigate(['words'], {queryParams: {w1: query.words[0], w2: query.words[1]}});
    } else {
      this.router.navigate(['words'], {
        queryParams: {
          w1: query.words[0],
          w2: query.words[1],
          w3: query.words[2]
        }
      });
    }
    this.dialogRef.close();
  }

  public selectWord(word: string): void {
    this.router.navigate(['words'], {queryParams: {w1: word}});
    this.dialogRef.close();
  }

}
