/* eslint-disable new-cap */
import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';


export interface DialogData {
  name: string;
}


@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})

export class DeleteModalComponent implements OnInit {
  deleteForm = new FormGroup({
    AS: new FormControl(''),
    SM: new FormControl(''),
    SI: new FormControl(''),
  });

  modalData = [];

  constructor(public dialogRef: MatDialogRef<DeleteModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  getSelectedValue(event: any) {
    this.modalData.push(event.source.name);
  }

  cancel() {
    this.dialogRef.close();
  }
}
