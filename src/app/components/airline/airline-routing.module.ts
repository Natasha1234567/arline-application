/* eslint-disable linebreak-style */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AirlineDashboardComponent} from './airline-dashboard/airline-dashboard.component';
import {PassengersListComponent} from './passengers-list/passengers-list.component';
import {SeatMapComponent} from './seat-map/seat-map.component';
import {CheckedInPassengerComponent} from './checked-in-passenger/checked-in-passenger.component';
import {InFlightComponent} from './in-flight/in-flight.component';
import {CheckInComponent} from './check-in/check-in.component';
import {LoginComponent} from 'src/app/core/login/login.component';

export const routes: Routes = [
  {path: '', component: AirlineDashboardComponent},
  {path: 'airline', component: AirlineDashboardComponent},
  {path: 'passengers', component: PassengersListComponent},
  {path: 'seatMap', component: SeatMapComponent},
  {path: 'checkedInPassenger', component: CheckedInPassengerComponent},
  {path: 'in-flight/:name', component: InFlightComponent},
  {path: 'check-in/:name', component: CheckInComponent},
  {path: 'login', component: LoginComponent},
];

// eslint-disable-next-line new-cap
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class AirlineRoutingModule {}
