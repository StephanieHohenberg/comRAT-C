import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {ComponentInteractionService} from "../../services/component-interaction.service";

@Component({
  selector: 'app-input-view',
  templateUrl: './input-view.component.html',
  styleUrls: ['./input-view.component.css']
})
export class InputViewComponent implements OnInit {

  @Input() public inputWords: string[] = [];
  @Input() public colors: string[] = [];
  public options: string[] = [];
  public hasHistory: boolean = true; //TODO:

  constructor(private componentInteractionService: ComponentInteractionService,
              private dataService: DataService, private router: Router) {
  }

  public ngOnInit(): void {
    this.options = this.dataService.getAllExistingWords();
  }

  public addWord(value: string, event): void {
    if (this.inputWords.findIndex(e => e === value) >= 0) {
      (<HTMLInputElement>document.getElementById("input")).value;
    } else if (this.inputWords.length < 3 && this.dataService.doesWordExist(value)) {
      this.inputWords.push(value);
      this.componentInteractionService.handleInputWordsChanged(this.inputWords);
      this.navigateToDashboard();
      (<HTMLInputElement>document.getElementById("input")).value;
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


  public getFilteredData(searchText: string): void {
    this.options = this.dataService.getAllExistingWords().filter((data: any) => data.toLowerCase().includes(searchText.toLowerCase()));
  }

  public openHistoryModal(): void {
    //TODO:
  }

}
