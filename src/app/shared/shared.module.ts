/* eslint-disable linebreak-style */
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material/material.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// eslint-disable-next-line max-len
import {DeleteModalComponent} from './components/delete-modal/delete-modal.component';
import {AddModalComponent} from './components/add-modal/add-modal.component';
// eslint-disable-next-line max-len
import {UpdateModalComponent} from './components/update-modal/update-modal.component';
// eslint-disable-next-line max-len
import {UndoCheckInComponent} from './components/undo-check-in/undo-check-in.component';
// eslint-disable-next-line max-len
import {SeatMapComponent} from './../components/airline/seat-map/seat-map.component';

// eslint-disable-next-line new-cap
@NgModule({
  declarations: [
    DeleteModalComponent,
    AddModalComponent,
    UpdateModalComponent,
    UndoCheckInComponent,
    SeatMapComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AddModalComponent,
    DeleteModalComponent,
    UpdateModalComponent,
    UndoCheckInComponent,
    SeatMapComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [],
})

export class SharedModule {}
