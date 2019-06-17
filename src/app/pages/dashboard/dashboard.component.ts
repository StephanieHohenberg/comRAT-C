import {Component, OnInit} from "@angular/core";
import {LINK_DATA} from "../../models/comRatC.data";
import {LinkData} from "../../models/list.data";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  public inputWords: string[] = [];
  public linkData: LinkData[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  public handleInputWordsChanged(inputWords: string[]): void {
    this.inputWords = inputWords;
    this.linkData = LINK_DATA;
  }

}
