import {Routes} from "@angular/router";
import {DashboardComponent} from "./app/pages/dashboard/dashboard.component";

export const APP_ROUTES: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'words', component: DashboardComponent},
];
