import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataService} from "../../services/data.service";
import {SearchQueryHistoryService} from "../../services/search-query-history.service";
import {SearchQueryHistoryDialogComponent} from "../../components/search-query-history-dialog/search-query-history-dialog.component";
import {MatDialog} from "@angular/material";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit, OnDestroy {

  public IMG_LOGO: string = "./assets/logo.png";

  public scrolledDown: boolean = false;
  public hasHistory: boolean = false;

  public numberOfWords: number = 0;
  public numberOfLinks: number = 0;

  private subscription: Subscription;

  constructor(private dataService: DataService,
              private searchQueryHistoryservice: SearchQueryHistoryService,
              public dialog: MatDialog) {
    this.numberOfWords = this.dataService.getNumberOfWords();
    this.numberOfLinks = this.dataService.getNumberOfLinks();
  }

  ngOnInit() {
    this.hasHistory = this.searchQueryHistoryservice.getSearchQueries().length > 0;
    this.subscription = this.searchQueryHistoryservice.getHasQueriesSubject().subscribe(() => {
      //this.hasHistory = true;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private scrollToDashboard(): void {
    this.scrolledDown = true;
    const element = document.getElementById("dashboard");
    element.scrollIntoView({block: "end", behavior: "smooth"});
  }

  public openHistoryModal(): void {
    this.dialog.open(SearchQueryHistoryDialogComponent);
  }


}
