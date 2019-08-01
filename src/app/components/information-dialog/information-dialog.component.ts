import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.scss']
})
export class InformationDialogComponent implements OnInit {

  public id: string;
  public word: string;
  public colors: string[] = ['#3aafa9', '#9E379F', '#ff8000'];
//TODO: color service

  constructor(public dialogRef: MatDialogRef<InformationDialogComponent>,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.word = this.dataService.getAllExistingWords()[this.id];
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
