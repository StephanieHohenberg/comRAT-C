import {Component, OnInit} from "@angular/core";
import {ComponentInteractionService} from "../../services/component-interaction.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs/index";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private routeSubscription: Subscription;
  public inputWords: string[] = [];
  public colors: string[] = ['#3aafa9', '#de0f3f', '#ffbd4a'];
  public isGraphViewFullscreen = false;


  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private componentInteractionService: ComponentInteractionService,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.resolveInputByRoute();
  }

  private resolveInputByRoute() {
    this.scrollToTop();
    this.routeSubscription = this.activatedRoute.queryParams.subscribe(
      (queryParams: Params) => {
        this.inputWords = [];
        const queryParamList = [queryParams['w1'], queryParams['w2'], queryParams['w3']];
        queryParamList.forEach(p => {
          this.resolveQueryParam(p)
        });
        if (this.inputWords.length > 0) {
          this.componentInteractionService.handleInputWordsChanged(this.inputWords);
          this.scrollToDashboard();
        }
      });
  }

  private resolveQueryParam(param: string): void {
    if (param != undefined
      && this.inputWords.findIndex(e => e === param) < 0
      && this.dataService.getAllExistingWords().findIndex(e => e === param) >= 0) {
      this.inputWords.push(param);
    }
  }

  private scrollToDashboard(): void {
    const element = document.getElementById("dashboard");
    element.scrollIntoView({block: "end", behavior: "smooth"});
  }

  private scrollToTop(): void {
    const element = document.getElementById("top");
    element.scrollIntoView({block: "end", behavior: "smooth"});
  }

  public ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  public changePanelSize(isGraphFullscreen: boolean): void {
    this.isGraphViewFullscreen = isGraphFullscreen;
  }

}
