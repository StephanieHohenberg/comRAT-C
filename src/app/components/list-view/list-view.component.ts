import {Component, Input, OnInit} from "@angular/core";
import {LinkData} from "../../models/list.data";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  @Input()
  public inputWords: string [] = [];

  @Input()
  linkData: LinkData[];

  constructor() {
  }

  ngOnInit() {
  }

}
