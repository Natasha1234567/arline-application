/* eslint-disable linebreak-style */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  {path: '', component: AdminDashboardComponent},
  {path: 'dashboard', component: AdminDashboardComponent},
];

// eslint-disable-next-line new-cap
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdminRoutingModule {}
