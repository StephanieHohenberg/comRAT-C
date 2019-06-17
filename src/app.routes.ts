import {Routes} from "@angular/router";
import {StartPageComponent} from "./app/pages/start-page/start-page.component";
import {DashboardComponent} from "./app/pages/dashboard/dashboard.component";

export const APP_ROUTES: Routes = [
  {path: '', component: StartPageComponent},
  {path: 'words', component: DashboardComponent},
];
