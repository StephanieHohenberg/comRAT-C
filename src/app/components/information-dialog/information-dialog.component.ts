import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {DataService} from '../../services/data.service';
import {APP_COLORS} from '../../../app.const';

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.scss']
})
export class InformationDialogComponent implements OnInit {

  public readonly colors: string[] = APP_COLORS;
  public id: string;
  public word: string;


  constructor(public dialogRef: MatDialogRef<InformationDialogComponent>,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.word = this.dataService.getWords()[this.id];
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
