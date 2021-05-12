import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {SearchQueryHistoryService} from '../../services/search-query-history.service';
import {SearchQueryHistoryDialogComponent} from '../../components/search-query-history-dialog/search-query-history-dialog.component';
import {MatDialog} from '@angular/material';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit, OnDestroy {

  public readonly IMG_LOGO = './assets/logo.png';

  public scrolledDown = false;
  public hasHistory = false;

  public numberOfWords = 0;
  public numberOfLinks = 0;

  private subscription: Subscription;

  constructor(private dataService: DataService,
              private searchQueryHistoryService: SearchQueryHistoryService,
              public dialog: MatDialog) {
    this.numberOfWords = this.dataService.getNumberOfWords();
    this.numberOfLinks = this.dataService.getNumberOfLinks();
  }

  public ngOnInit(): void {
    this.hasHistory = this.searchQueryHistoryService.getSearchQueries().length > 0;
    this.subscription = this.searchQueryHistoryService.getHasQueriesSubject().subscribe(() => {
      this.hasHistory = true;
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private scrollToDashboard(): void {
    this.scrolledDown = true;
    const element = document.getElementById('dashboard');
    element.scrollIntoView({block: 'end', behavior: 'smooth'});
  }

  public openHistoryModal(): void {
    this.dialog.open(SearchQueryHistoryDialogComponent);
  }

}
