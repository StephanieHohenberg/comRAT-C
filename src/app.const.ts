import {Routes} from '@angular/router';
import {DashboardComponent} from './app/pages/dashboard/dashboard.component';

export const APP_ROUTES: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'words', component: DashboardComponent},
];

export const APP_COLORS: string[] = ['#3aafa9', '#9E379F', '#ff8000'];
