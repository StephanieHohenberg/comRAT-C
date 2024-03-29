import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {GraphData} from '../../models/graph.data';
import {Subscription} from 'rxjs/index';
import {ComponentInteractionService} from '../../services/component-interaction.service';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css']
})
export class GraphViewComponent implements OnInit, OnDestroy {

  public graphData: GraphData;
  private inputWordsChangedSubscription: Subscription;


  @Output() private viewSizeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public inputWords: string[] = [];
  @Input() public colors: string[] = [];

  public isFullscreen = false;

  constructor(private dataService: DataService, private componentInteractionService: ComponentInteractionService) {
  }

  public ngOnInit(): void {
    this.graphData = this.dataService.getGraphDataOfWords(this.inputWords);
    this.inputWordsChangedSubscription = this.componentInteractionService.getInputWordsChangedObservable().subscribe(
      (words: string[]) => {
        this.inputWords = words;
        if (this.inputWords.length === 0) {
          this.graphData = this.dataService.getGraphDataForExplorationMode();
        } else {
          this.graphData = this.dataService.getGraphDataOfWords(this.inputWords);
        }
      }
    );
  }

  public ngOnDestroy(): void {
    if (this.inputWordsChangedSubscription) {
      this.inputWordsChangedSubscription.unsubscribe();
    }
  }

  public nodeChange(event): void {
    console.log(event);
  }

  public changeViewSize(isFullscreen: boolean): void {
    this.isFullscreen = isFullscreen;
    this.viewSizeChanged.emit(isFullscreen);
  }
}
