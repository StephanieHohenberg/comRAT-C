import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  private scrollToDashboard(): void {
    const element = document.getElementById("dashboard");
    element.scrollIntoView({block: "end", behavior: "smooth"});
  }


}
