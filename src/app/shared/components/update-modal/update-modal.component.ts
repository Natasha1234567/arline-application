/* eslint-disable new-cap */
import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormArray} from '@angular/forms';
import {GetAdminDataService} from './../../services/admin/get-admin-data.service';
import {Constants} from '../../config';

export interface DialogData {
  passData: any;
  UserType: string;
}

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
})

export class UpdateModalComponent implements OnInit {
  updateForm;
  modalData = {
    id: -1,
    name: '',
    address: '',
    seatNumber: -1,
    productsName: [],
    specialMeals: '',
    serviceName: [],
    ancillaryServices: '',
    passport: '',
    passportNo: '',
  };

  mnths = Constants.monthts;
  services = [];
  isAirline: boolean;
  status = '';
  items = [];
  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<UpdateModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private adminService: GetAdminDataService) {
    this.updateForm = this.fb.group({
      name: [this.data.passData.name],
      address: [this.data.passData.address],
      seatNo: [this.data.passData.seatNumber],
      item: [this.data.passData.productsName],
      mealType: [this.data.passData.specialMeals],
      serviceName: this.fb.array(this.services),
      passport: [this.data.passData.passport],
      passportNo: [this.data.passData.passportNumber],
    });
  }

  ngOnInit(): void {
    this.status = localStorage.getItem('status');

    this.isAirline = this.data.UserType === 'airline' ? true : false;
    this.modalData = {
      id: this.data.passData.id,
      name: this.updateForm.get('name').value,
      address: this.updateForm.get('address').value,
      seatNumber: this.updateForm.get('seatNo').value,
      productsName: this.updateForm.get('item').value,
      specialMeals: this.updateForm.get('mealType').value,
      serviceName: [],
      ancillaryServices:
      this.updateForm.get('serviceName').value !== undefined ? 'Yes' : 'No',
      passport: this.updateForm.get('passport').value,
      passportNo:
      this.updateForm.get('passportNo').value !== undefined ?
      this.updateForm.get('passportNo').value : '',
    };
    this.getItems();
    this.getServices();
  }

  onShoppingListChange(event: any) {
    this.updateForm.patchValue({
      item: event.value,
    });
    this.modalData.productsName[0] = this.updateForm.get('item').value;
  }

  getPassportDetails(event: any) {
    this.updateForm.patchValue({
      passport: event.value,
    });
    this.modalData.passport = this.updateForm.get('passport').value;
  }

  getInputValue(event, val: string) {
    if (val === 'Name') {
      this.updateForm.patchValue({
        name: event.target.value,
      });
      this.modalData.name = this.updateForm.get('name').value;
    } else if ( val === 'Address') {
      this.updateForm.patchValue({
        address: event.target.value,
      });
      this.modalData.address = this.updateForm.get('address').value;
    } else if ( val === 'seatNo') {
      this.updateForm.patchValue({
        seatNo: event.target.value,
      });
      this.modalData.seatNumber = this.updateForm.get('seatNo').value;
    } else if ( val === 'passportNo') {
      this.updateForm.patchValue({
        passportNo: event.target.value,
      });
      this.modalData.passportNo = this.updateForm.get('passportNo').value;
    }
  }

  getServiceName(event: any) {
    const index =
    this.services.findIndex( (x) => x.serviceName === event.source.name);
    this.services[index].checked = !this.services[index].checked;
    this.updateForm.patchValue({
      serviceName: this.services,
    });
    this.services.forEach((element) => {
      if (element.checked) {
        const serviceIndex =
        this.modalData.serviceName.findIndex( (x) => x === element.serviceName);
        if (serviceIndex === -1) {
          this.modalData.serviceName.push(element.serviceName);
        }
      }
    });
  }


  cancel() {
    this.dialogRef.close();
  }

  getMealType(event: any) {
    this.updateForm.patchValue({
      mealType: event.value,
    });
    this.modalData.specialMeals = this.updateForm.get('mealType').value;
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
      const index = (this.updateForm.controls.serviceName.value &&
        this.updateForm.controls.serviceName.value.length > 0) ?
        this.updateForm.controls.serviceName.value.findIndex((x) => x === o.serviceName) : -1;
      if (index === -1) {
        (this.updateForm.controls.serviceName as FormArray).push(control);
      } else {
        o.checked = this.data.passData.serviceName[0] === o.serviceName ? true : false;
      }
    });
    this.updateForm.patchValue({
      serviceName: this.services,
    });
  }

  getItems() {
    this.adminService.getJsonData('items').subscribe((result) => {
      if (result !== undefined && result.length > 0) {
        this.items = result;
        const itemm = this.items.find((x) => x.itemName ===
        this.data.passData.productsName[0]);
        this.updateForm.patchValue({
          item: itemm,
        });
      }
    });
  }
}
