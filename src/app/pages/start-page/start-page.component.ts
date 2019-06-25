import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

  public IMG_LOGO: string = "./assets/logo.png";

  public scrolledDown: boolean = false;
  public hasHistory: boolean = true;

  constructor() {
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
