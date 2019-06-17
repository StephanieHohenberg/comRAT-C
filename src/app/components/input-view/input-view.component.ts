import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {WORDS} from "../../models/comRatC.data";
import {Subscription} from "rxjs/index";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-input-view',
  templateUrl: './input-view.component.html',
  styleUrls: ['./input-view.component.css']
})
export class InputViewComponent implements OnInit, OnDestroy {

  @Input()
  public isStartView: boolean = false;
  @Input()
  public inputWords: string[] = [];

  @Output()
  public inputWordsChange: EventEmitter<string[]> = new EventEmitter();
  public options: string[] = [];
  private routeSubscription: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.options = WORDS;
    this.resolveInputByRoute();
  }

  private resolveInputByRoute() {
    this.routeSubscription = this.activatedRoute.queryParams.subscribe(
      (queryParams: Params) => {
        this.inputWords = [];
        const queryParamList = [queryParams['w1'], queryParams['w2'], queryParams['w3']];
        queryParamList.forEach(p => {
          this.resolveQueryParam(p)
        });
        this.inputWordsChange.emit(this.inputWords);
      });
  }

  private resolveQueryParam(param: string): void {
    if (param != undefined
      && this.inputWords.findIndex(e => e === param) < 0
      && WORDS.findIndex(e => e === param) >= 0) {
      this.inputWords.push(param);
    }
  }

  public ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  public addWord(value: string, event): void {
    if (this.inputWords.findIndex(e => e === value) >= 0) {
      document.getElementById("input").value = "";
    } else if (this.inputWords.length < 3 && WORDS.findIndex(e => e === value) >= 0) {
      this.inputWords.push(value);
      this.inputWordsChange.emit(this.inputWords);
      this.navigateToDashboard();
      document.getElementById("input").value = "";
    }

    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  private navigateToDashboard(): void {
    if (this.inputWords.length === 0) {
      this.router.navigate(['/']);
    } else if (this.inputWords.length === 1) {
      this.router.navigate(['words'], {queryParams: {w1: this.inputWords[0]}});
    } else if (this.inputWords.length === 2) {
      this.router.navigate(['words'], {queryParams: {w1: this.inputWords[0], w2: this.inputWords[1]}});
    } else {
      this.router.navigate(['words'], {
        queryParams: {
          w1: this.inputWords[0],
          w2: this.inputWords[1],
          w3: this.inputWords[2]
        }
      });
    }
  }

  removeWord(index: number) {
    this.inputWords.splice(index, 1);
    this.inputWordsChange.emit(this.inputWords);
    this.navigateToDashboard();
  }


  getFilteredData(searchText: string) {
    this.options = WORDS.filter((data: any) => data.toLowerCase().includes(searchText.toLowerCase()));
  }

}
