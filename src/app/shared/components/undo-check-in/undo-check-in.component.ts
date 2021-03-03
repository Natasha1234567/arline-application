/* eslint-disable new-cap */
import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';

export interface DialogData {
  seatNumber: any;
}
@Component({
  selector: 'app-undo-check-in',
  templateUrl: './undo-check-in.component.html',
  styleUrls: ['./undo-check-in.component.scss'],
})

export class UndoCheckInComponent implements OnInit {
  undoForm = new FormGroup({
    yes: new FormControl(''),
    no: new FormControl(''),
  });

  modalData: any;

  constructor( public dialogRef: MatDialogRef<UndoCheckInComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  getSelectedValue(event: any) {
    this.modalData = event.source.name;
  }

  cancel() {
    this.dialogRef.close();
  }
}
