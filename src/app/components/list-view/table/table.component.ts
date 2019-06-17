import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {LinkData} from "../../../models/list.data";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input()
  public linkData: LinkData[] = [];
  public displayedLinkData: LinkData[];

  constructor() {
    console.log(this.linkData);
    this.displayedLinkData = Object.assign(this.linkData, {});
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.displayedLinkData = Object.assign(this.linkData, {});
  }


  public getFilteredData(searchText: string): void {
    this.displayedLinkData = this.linkData.filter((data: any) => data.linkWord.toLowerCase().includes(searchText.toLowerCase()));
  }

  public getRankOfWord(word: string): number {
    return this.linkData.findIndex(data => data.linkWord === word) + 1;
  }

  public getPercentageLabel(probability: number): string {
    return `${probability} %`;
  }

}
