import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComponentInteractionService} from '../../services/component-interaction.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/index';
import {DataService} from '../../services/data.service';
import {SearchQueryHistoryService} from '../../services/search-query-history.service';
import {APP_COLORS} from '../../../app.const';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public readonly colors: string[] = APP_COLORS;
  private routeSubscription: Subscription;
  public inputWords: string[] = [];
  public isGraphViewFullscreen = false;


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private componentInteractionService: ComponentInteractionService,
              private searchQueryHistoryService: SearchQueryHistoryService,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.resolveInputByRoute();
  }

  public ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  public changePanelSize(isGraphFullscreen: boolean): void {
    this.isGraphViewFullscreen = isGraphFullscreen;
  }

  private resolveInputByRoute() {
    this.scrollToTop();
    this.routeSubscription = this.activatedRoute.queryParams.subscribe(
      (queryParams: Params) => {
        this.inputWords = [];
        const queryParamList = [queryParams['w1'], queryParams['w2'], queryParams['w3']];
        queryParamList.forEach(p => {
          this.resolveQueryParam(p);
        });
        if (this.inputWords.length > 0) {
          this.componentInteractionService.handleInputWordsChanged(this.inputWords);
          this.searchQueryHistoryService.addQueryOfWords(this.inputWords);
          this.scrollToDashboard();
        }
      });
  }

  private resolveQueryParam(param: string): void {
    if (param !== undefined
      && this.inputWords.findIndex(e => e === param) < 0
      && this.dataService.getWords().findIndex(e => e === param) >= 0) {
      this.inputWords.push(param);
    }
  }
  private scrollToDashboard(): void {
    const element = document.getElementById('dashboard');
    element.scrollIntoView({block: 'end', behavior: 'smooth'});
  }

  private scrollToTop(): void {
    const element = document.getElementById('top');
    element.scrollIntoView({block: 'end', behavior: 'smooth'});

  }

}
