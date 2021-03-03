/* eslint-disable quotes */
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormArray, FormControl,
  FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef,
  MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MaterialModule} from '../../material/material.module';
import {AddModalComponent} from './add-modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GetAdminDataService} from '../../services/admin/get-admin-data.service';
import {of} from 'rxjs';

const dialogMock = {close: () => {}};

describe('AddModalComponent', () => {
  let component: AddModalComponent;
  let fixture: ComponentFixture<AddModalComponent>;
  const data = {
    UserType: 'airline',
    data: {
      address: 'Udaipur',
      seatNumber: 20,
      name: 'Krishna',
      productsName: ['eye-cover'],
      specialMeals: 'Non-veg',
      serviceName: ['onboard-food'],
      passport: 'Yes',
      passportNumber: '4354364776786',
      DOB: '2020-02-12',
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddModalComponent],
      imports: [ReactiveFormsModule, MatDialogModule,
        HttpClientTestingModule, MaterialModule, BrowserAnimationsModule],
      providers: [{provide: MatDialogRef, useValue: dialogMock},
        {provide: MAT_DIALOG_DATA, useValue: data}],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModalComponent);
    component = fixture.componentInstance;
    component.addForm = new FormGroup({
      name: new FormControl(''),
      address: new FormControl(''),
      seatNo: new FormControl(''),
      flightName: new FormControl(''),
      item: new FormControl(''),
      mealType: new FormControl(''),
      serviceName: new FormArray([]),
      passport: new FormControl(''),
      passportNo: new FormControl(''),
      dob: new FormControl(''),
    });
    component.modalData = {
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
      DOB: '',
      flightName: '',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onShoppingListChange', () => {
    const event = {value: 'water-bottle'};
    component.onShoppingListChange(event);
  });

  it('getPassportDetails', () => {
    const event = {value: 'yes'};
    component.getPassportDetails(event);
  });

  it('getInputValue with  Name as val', () => {
    const event = {target: {value: 'Dinesh'}};
    component.getInputValue(event, 'Name');
  });

  it('getInputValue with address as val', () => {
    const event = {target: {value: 'Noida'}};
    component.getInputValue(event, 'Address');
  });

  it('getInputValue with seatNo as val', () => {
    const event = {target: {value: 6}};
    component.getInputValue(event, 'seatNo');
  });

  it('getInputValue with passportNo as val', () => {
    const event = {target: {value: 3323434235332}};
    component.getInputValue(event, 'passportNo');
  });

  it('getInputValue with DOB as val', () => {
    const date = new Date();
    const event = {target: {value: date}};
    component.getInputValue(event, 'DOB');
  });

  it('getServiceName', () => {
    component.services = [{
      serviceName: 'onboard-food',
      checked: false,
    }, {
      serviceName: 'extra-baggage',
      checked: false,
    }];
    const event = {source: {name: 'onboard-food'}};
    component.getServiceName(event);
  });

  it('getMealType', () => {
    const event = {value: 'veg'};
    component.getMealType(event);
  });

  it('cancel', () => {
    component.cancel();
  });

  it('onFlightChange', () => {
    const event = {value: 'Indigo'};
    component.onFlightChange(event);
  });

  it('getExistingData', () => {
    component.getExistingData();
  });

  it('getServices', () => {
    const result = [{
      checked: false,
      id: 1,
      price: '$800',
      serviceName: 'onboard-food',
    },
    {
      checked: false,
      id: 2,
      price: '$500',
      serviceName: 'extra-baggage',
    }];
    const service = fixture.componentRef.injector.get(GetAdminDataService);
    const spy = spyOn(service, 'getJsonData').and.returnValue(of(result));
    component.getServices();
    expect(spy).toHaveBeenCalled();
  });

  it('getServiceName for else', () => {
    component.services = [{
      serviceName: 'onboard-food',
      checked: true,
    }, {
      serviceName: 'extra-baggage',
      checked: true,
    }];
    const event = {source: {name: 'onboard-food'}};
    component.getServiceName(event);
  });
});
