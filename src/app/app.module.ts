import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ListViewComponent} from './components/list-view/list-view.component';
import {GraphViewComponent} from './components/graph-view/graph-view.component';
import {InputViewComponent} from './components//input-view/input-view.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TableComponent} from './components/list-view/table/table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatTooltipModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {StartPageComponent} from './pages/start-page/start-page.component';
import {AngularNeo4jModule} from 'angular-neo4j';
import {DataService} from './services/data.service';
import {ComponentInteractionService} from './services/component-interaction.service';
import {CytoscapeGraphComponent} from './components/graph-view/cytoscape-graph/cytoscape-graph.component';
import {SearchQueryHistoryDialogComponent} from './components/search-query-history-dialog/search-query-history-dialog.component';
import {SearchQueryHistoryTableComponent} from './components/search-query-history-dialog/search-query-history-table/search-query-history-table.component';
import {SearchQueryHistoryService} from './services/search-query-history.service';
import {InformationDialogComponent} from './components/information-dialog/information-dialog.component';

export const APP_ROUTES: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'words', component: DashboardComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    GraphViewComponent,
    InputViewComponent,
    TableComponent,
    StartPageComponent,
    DashboardComponent,
    CytoscapeGraphComponent,
    SearchQueryHistoryDialogComponent,
    SearchQueryHistoryTableComponent,
    InformationDialogComponent,
    SearchQueryHistoryDialogComponent,
    InformationDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    AngularNeo4jModule,

    // Bootstrap Modules
    NgbModule,

    // Angular Material Modules
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  providers: [DataService, ComponentInteractionService, SearchQueryHistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }

