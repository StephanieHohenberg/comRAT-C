import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {AngularNeo4jService} from "angular-neo4j";

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css']
})
export class GraphViewComponent implements OnInit, OnDestroy {
  constructor(private neo4j: AngularNeo4jService) {
  }


  @Output()
  private viewSizeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  private URL = 'bolt://localhost:7687';
  private USERNAME = 'neo4j';
  private PASSWORD = 'neo4j';
  public isLoading = true;
  public hasFailed = true;

  public isFullscreen = false;

  public ngOnInit(): void {
    this.neo4j
      .connect(this.URL, this.USERNAME, this.PASSWORD, true)
      .then(driver => {
        if (driver) {
          this.isLoading = false;
          const query = 'MATCH (n:USER {name: {name}}) RETURN n';
          const params = {name: 'bob'};

          /**
           this.neo4j.run(query, params).then(res => {
            console.log(res);
          });
           **/

        }
      })
      .catch(error => {
        this.hasFailed = true;
      });
  }

  public ngOnDestroy(): void {
    this.neo4j.disconnect()
  }

  public changeViewSize(isFullscreen: boolean): void {
    this.isFullscreen = isFullscreen;
    this.viewSizeChanged.emit(isFullscreen);
  }
}
