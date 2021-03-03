/* eslint-disable linebreak-style */
import {NgModule} from '@angular/core';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from './../../shared/material/material.module';
import {CommonModule} from '@angular/common';
import {CoreModule} from './../../core/core.module';
// eslint-disable-next-line new-cap
@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    MaterialModule,
    FormsModule,
    AdminRoutingModule,
    CommonModule,
    CoreModule,
  ],
  entryComponents: [],
})

export class AdminModule {}
