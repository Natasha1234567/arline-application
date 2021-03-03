import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constants } from '../../config';
import { GetAdminDataService } from './../../services/admin/get-admin-data.service';

export interface DialogData {
  data: any;
  UserType: string;
}


@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})


export class AddModalComponent implements OnInit {
  modalData = {
    id: -1,
    name: '',
    address: '',
    seatNumber: -1,
    flightName: '',
    productsName: [],
    specialMeals: '',
    serviceName: [],
    ancillaryServices: '',
    passport: '',
    passportNo: '',
    DOB: '',
  };
  mnths = Constants.monthts;
  isNew: boolean;
  services = [];
  addForm;
  isAirline: boolean;
  status = '';
  serviceArray = new FormArray([
    new FormControl(false),
    new FormControl(false)]);

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, private adminService: GetAdminDataService) {
    if (this.data.data === undefined) {
      this.addForm = this.fb.group({
        name: [''],
        address: [''],
        seatNo: [''],
        flightName: [''],
        item: [''],
        mealType: [''],
        serviceName: [''],
        passport: [''],
        passportNo: [''],
        dob: [''],
      });
    } else {
      this.addForm = this.fb.group({
        name: [this.data.data.name],
        address: [this.data.data.address],
        seatNo: [this.data.data.seatNumber],
        item: [this.data.data.productsName],
        mealType: [this.data.data.specialMeals],
        serviceName: this.fb.array(this.data.data.serviceName),
        passport: [this.data.data.passport],
        passportNo: [this.data.data.passportNumber],
        dob: [this.data.data.DOB],
      });
    }
  }

  ngOnInit(): void {
    this.status = localStorage.getItem('status');
    this.getExistingData();
    this.getServices();
  }

  onShoppingListChange(event: any) {
    this.addForm.patchValue({
      item: event.value,
    });
    this.modalData.productsName = this.addForm.get('item').value;
  }

  getPassportDetails(event: any) {
    this.addForm.patchValue({
      passport: event.value,
    });
    this.modalData.passport = this.addForm.get('passport').value;
  }


  getInputValue(event, val: string) {
    if (val === 'Name') {
      this.addForm.patchValue({
        name: event.target.value,
      });
      this.modalData.name = this.addForm.get('name').value;
    } else if ( val === 'Address') {
      this.addForm.patchValue({
        address: event.target.value,
      });
      this.modalData.address = this.addForm.get('address').value;
    } else if ( val === 'seatNo') {
      this.addForm.patchValue({
        seatNo: event.target.value,
      });
      this.modalData.seatNumber = this.addForm.get('seatNo').value;
    } else if ( val === 'passportNo') {
      this.addForm.patchValue({
        passportNo: event.target.value,
      });
      this.modalData.passportNo = this.addForm.get('passportNo').value;
    } else if ( val === 'DOB') {
      this.addForm.patchValue({
        dob: event.target.value,
      });
      this.formatDate();
    }
  }

  getServiceName(event: any) {
    const index =
    this.services.findIndex((x) => x.serviceName === event.source.name);
    this.services[index].checked = !this.services[index].checked;
    this.addForm.patchValue({
      serviceName: this.services,
    });
    this.services.forEach((element) => {
      if (element.checked) {
        const serviceIndex = this.modalData.serviceName.findIndex( (x) => x === element.serviceName);
        if (serviceIndex === -1) {
          this.modalData.serviceName.push(element.serviceName);
        }
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  formatDate() {
    if (this.addForm.get('dob').value !== '') {
      const date = this.addForm.get('dob').value.toString();
      const day = date.split(' ');
      const dob = [day[2], this.mnths[day[1]], day[3]].join('-');
      this.modalData.DOB = dob;
    }
  }

  getMealType(event: any) {
    this.addForm.patchValue({
      mealType: event.value,
    });
    this.modalData.specialMeals = this.addForm.get('mealType').value;
  }

  getExistingData() {
    if (this.data.data !== undefined) {
      this.isNew = false;
      this.isAirline = this.data.UserType === 'admin' ? false : true;
      this.modalData = this.data.data;
    } else {
      this.isNew = true;
    }
  }

  getServices() {
    this.adminService.getJsonData('services').subscribe((result) => {
      if (result !== undefined && result.length > 0) {
        this.services = result;
        this.addServiceControls();
      }
    });
  }

  addServiceControls() {
    this.services.forEach((o, i) => {
      const control = new FormControl();
      control.setValue(o.serviceName);
      // tslint:disable-next-line: max-line-length
      const index =
      (this.addForm.controls.serviceName.value &&
        this.addForm.controls.serviceName.value.length > 0) ?
        this.addForm.controls.serviceName.value.findIndex((x) => x === o.serviceName) : -1;
      if (index === -1) {
        (this.addForm.controls.serviceName as FormArray).push(control);
      } else {
        o.checked =
        this.data.data.serviceName[0] === o.serviceName ? true : false;
      }
    });
    this.addForm.patchValue({
      serviceName: this.services,
    });
  }

  onFlightChange(event: any) {
    this.addForm.patchValue({
      flightName: event.value,
    });
    this.modalData.flightName = this.addForm.get('flightName').value;
  }
}
