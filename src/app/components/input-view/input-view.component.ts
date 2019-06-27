import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {ComponentInteractionService} from "../../services/component-interaction.service";

@Component({
  selector: 'app-input-view',
  templateUrl: './input-view.component.html',
  styleUrls: ['./input-view.component.css']
})
export class InputViewComponent implements OnInit, OnChanges {

  @Input() public inputWords: string[] = [];
  @Input() public colors: string[] = [];
  public options: string[] = [];
  public hasHistory: boolean = true; //TODO:

  constructor(private componentInteractionService: ComponentInteractionService,
              private dataService: DataService, private router: Router) {
  }

  public ngOnInit(): void {
    this.options = this.getDefaultOptions();
  }

  public ngOnChanges(): void {
    let searchText = '';
    if ((<HTMLInputElement>document.getElementById("input"))) {
      searchText = (<HTMLInputElement>document.getElementById("input")).value;
    }
    this.getFilteredData(searchText);
  }

  public addWord(value: string, event): void {
    if (this.inputWords.findIndex(e => e === value) >= 0 && this.options.length === 0) {
      (<HTMLInputElement>document.getElementById("input")).value = '';
    } else if (this.inputWords.length < 3 && this.dataService.doesWordExist(value.toLowerCase())) {
      this.inputWords.push(value.toLowerCase());
      this.componentInteractionService.handleInputWordsChanged(this.inputWords);
      this.navigateToDashboard();
      (<HTMLInputElement>document.getElementById("input")).value = '';
    }

    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  private navigateToDashboard(): void {
    if (this.inputWords.length === 0) {
      this.router.navigate(['/words']);
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

  public removeWord(index: number): void {
    this.inputWords.splice(index, 1);
    this.componentInteractionService.handleInputWordsChanged(this.inputWords);
    this.navigateToDashboard();
  }

  public removeWords(): void {
    this.inputWords = [];
    this.componentInteractionService.handleInputWordsChanged(this.inputWords);
    this.navigateToDashboard();
  }


  private getDefaultOptions() {
    return this.dataService.getAllExistingWords().sort();
  }

  public getFilteredData(searchText: string): void {
    if (searchText.length === 0) {
      this.options = this.getDefaultOptions();
    } else {
      this.options = this.getDefaultOptions().filter((data: any) =>
      data.includes(searchText.toLowerCase())
      && this.inputWords.findIndex(word => data === word) < 0);
    }
  }

  public isPartOfInputWord(searchText: string): boolean {
    this.inputWords.forEach(word => {
      if (word.includes(searchText.toLowerCase())) {
        return true;
      }
    });
    return false;
  }

  public openHistoryModal(): void {
    //TODO:
  }

}
