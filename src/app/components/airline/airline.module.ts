/* eslint-disable linebreak-style */
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AirlineRoutingModule} from './airline-routing.module';
import {AirlineComponent} from './airline.component';
import {InFlightComponent} from './in-flight/in-flight.component';
import {CheckInComponent} from './check-in/check-in.component';
import {PassengersListComponent} from './passengers-list/passengers-list.component';
import {CheckedInPassengerComponent} from './checked-in-passenger/checked-in-passenger.component';
import {MaterialModule} from './../../shared/material/material.module';
import {CoreModule} from './../../core/core.module';
import {SharedModule} from './../../shared/shared.module';

// eslint-disable-next-line new-cap
@NgModule({
  declarations: [
    AirlineComponent,
    InFlightComponent,
    CheckInComponent,
    PassengersListComponent,
    CheckedInPassengerComponent,
  ],
  imports: [
    SharedModule,
    CoreModule,
    CommonModule,
    AirlineRoutingModule,
    MaterialModule,
  ],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})


export class AirlineModule {}
