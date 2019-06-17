import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {ListViewComponent} from "./components/list-view/list-view.component";
import {GraphViewComponent} from "./components/graph-view/graph-view.component";
import {InputViewComponent} from "./components//input-view/input-view.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TableComponent} from "./components/list-view/table/table.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MatChipsModule, MatIconModule, MatProgressSpinnerModule} from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {APP_ROUTES} from "../app.routes";
import {RouterModule} from "@angular/router";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {StartPageComponent} from "./pages/start-page/start-page.component";

@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    GraphViewComponent,
    InputViewComponent,
    TableComponent,
    StartPageComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),

    //Bootstrap Modules
    NgbModule,

    //Angular Material Modules
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
