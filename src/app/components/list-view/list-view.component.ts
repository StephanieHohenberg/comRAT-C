import {Component, Input, OnInit} from "@angular/core";
import {LinkData, TableData, WordData} from "../../models/list.data";
import {DataService} from "../../services/data.service";
import {ComponentInteractionService} from "../../services/component-interaction.service";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  @Input() public inputWords: string [] = [];
  @Input() public colors: string[] = [];
  private inputWordsChangedsubscription: Subscription;
  public wordsDisplayStatus: boolean[] = [false, false, false];
  public tableData: TableData[] = [];
  public explorationMode: boolean = false;

  constructor(private dataService: DataService, private componentInteractionService: ComponentInteractionService) {
  }

  ngOnInit() {
    this.resolveInputWordsChanged(this.inputWords);
    this.inputWordsChangedsubscription = this.componentInteractionService.getInputWordsChangedObservable().subscribe(
      (words: string[]) => {
        this.resolveInputWordsChanged(words);
      }
    );
  }

  public ngOnDestroy(): void {
    if (this.inputWordsChangedsubscription) {
      this.inputWordsChangedsubscription.unsubscribe();
    }
  }


  private resolveInputWordsChanged(words: string[]) {
    this.inputWords = words;
    this.wordsDisplayStatus = [false, false, false];
    this.inputWords.forEach((value, index) => {
      this.wordsDisplayStatus[index] = true;
    });
    this.displayLinkDataOfDisplayedWords();
  }

  private toogleWordDisplayStatus(index: number) {
    this.wordsDisplayStatus[index] = !this.wordsDisplayStatus[index];
    this.displayLinkDataOfDisplayedWords();
  }

  private displaySingleWordWithIndex(index: number) {
    this.wordsDisplayStatus = [false, false, false];
    this.wordsDisplayStatus[index] = true;
    this.displayLinkDataOfDisplayedWords();
  }

  private displayLinkDataOfDisplayedWords() {
    this.tableData = [];

    if (this.getDisplayedWords().length === 0) {
      this.explorationMode = true;
      let wordData: WordData[] = this.dataService.getWordDataOfAllWords();
      this.mapWordDataToTableData(wordData);

    } else if (this.getDisplayedWords().length === 1) {
      let displayedWord = this.getDisplayedWords()[0];
      let linkData = this.dataService.getAllLinksOfWord(displayedWord);
      this.mapLinkDataToTableData(linkData, displayedWord);
    }
  }

  public getDisplayedWords(): string[] {
    return this.inputWords.filter((value, index) => this.wordsDisplayStatus[index]);
  }


  private mapLinkDataToTableData(linkData: LinkData[], word: string): void {
    this.tableData = [];
    for (let i = 0; i < linkData.length; i++) {
      let pre: boolean = linkData[i].word1.toLowerCase() === word.toLowerCase();
      this.tableData.push({
        rank: i + 1,
        link_strength: linkData[i].link_strength,
        label: pre ? linkData[i].word2.toLowerCase() : linkData[i].word1.toLowerCase(),
        pre: pre,
      });
    }
  }

  private mapWordDataToTableData(wordData: WordData[]): void {
    this.tableData = [];
    for (let i = 0; i < wordData.length; i++) {
      this.tableData.push({
        rank: i + 1,
        link_strength: wordData[i].associationAmount,
        label: wordData[i].word,
        pre: undefined,
      });
    }
  }

}
