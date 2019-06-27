import {Component, OnInit} from "@angular/core";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

  public IMG_LOGO: string = "./assets/logo.png";

  public scrolledDown: boolean = false;
  public hasHistory: boolean = true;

  public numberOfWords: number = 0;
  public numberOfLinks: number = 0;

  constructor(private dataService: DataService) {
    this.numberOfWords = this.dataService.getNumberOfWords();
    this.numberOfLinks = this.dataService.getNumberOfLinks();
  }

  ngOnInit() {
  }

  private scrollToDashboard(): void {
    this.scrolledDown = true;
    const element = document.getElementById("dashboard");
    element.scrollIntoView({block: "end", behavior: "smooth"});
  }

  public openHistoryModal(): void {
    //TODO:
  }

}
