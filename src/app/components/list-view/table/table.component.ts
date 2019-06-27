import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {TableData} from "../../../models/list.data";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() public displayedWords: string[];
  @Input() public tableData: TableData[] = [];
  @Input() public explorationMode: boolean = true;
  @Input() public colors: string[];

  public displayedTableData: TableData[];

  constructor() {
  }

  ngOnInit() {
    this.displayedTableData = Object.assign(this.tableData, {});
  }

  ngOnChanges() {
    this.displayedTableData = Object.assign(this.tableData, {});
    let searchText = (<HTMLInputElement>document.getElementById("filter")).value;
    if (searchText != undefined && searchText.length > 0) {
      this.getFilteredData(searchText);
    }

  }


  public getFilteredData(searchText: string): void {
    console.log(searchText);
    this.displayedTableData = this.tableData.filter((data: TableData) => data.label.toLowerCase().includes(searchText.toLowerCase()));
  }



}
