import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material";
import {SearchQueryHistoryService} from "../../services/search-query-history.service";
import {SearchQuery} from "../../models/searchQuery.data";

@Component({
  selector: 'app-search-query-history-dialog',
  templateUrl: './search-query-history-dialog.component.html',
  styleUrls: ['./search-query-history-dialog.component.scss']
})
export class SearchQueryHistoryDialogComponent implements OnInit {

  public searchQueries: SearchQuery[] = [];
  public colors: string[] = ['#3aafa9', '#9E379F', '#ff8000'];
//TODO: color service

  constructor(public dialogRef: MatDialogRef<SearchQueryHistoryDialogComponent>,
              private searchQueryHistoryService: SearchQueryHistoryService) {
  }

  ngOnInit() {
    this.searchQueries = this.searchQueryHistoryService.getSearchQueries();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


}
