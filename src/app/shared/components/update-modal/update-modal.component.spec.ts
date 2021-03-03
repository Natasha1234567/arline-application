import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../material/material.module';
import { UpdateModalComponent } from './update-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { GetAdminDataService } from '../../services/admin/get-admin-data.service';
import { of } from 'rxjs';

const dialogMock = { close: () => { } };

describe('UpdateModalComponent', () => {
  let component: UpdateModalComponent;
  let fixture: ComponentFixture<UpdateModalComponent>;
  const data = {
    UserType: 'airline',
    passData: {
      address: 'Udaipur',
      seatNumber: 20,
      name: 'Krishna',
      productsName: ['eye-cover'],
      specialMeals: 'Non-veg',
      serviceName: ['onboard-food'],
      passport: 'Yes',
      passportNumber: '4354364776786',
      DOB: '2020-02-12'
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateModalComponent ],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule],
      providers: [
        {provide: MatDialogRef, useValue: dialogMock},
        {provide: MAT_DIALOG_DATA, useValue: data}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateModalComponent);
    component = fixture.componentInstance;
    component.updateForm = new FormGroup({
      name: new FormControl(data.passData.name),
      address: new FormControl(data.passData.address),
      seatNo: new FormControl(data.passData.seatNumber),
      item: new FormControl(data.passData.productsName),
      mealType: new FormControl(data.passData.specialMeals),
      serviceName: new FormArray([]),
      passport: new FormControl(data.passData.passport),
      passportNo: new FormControl(data.passData.passportNumber),
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
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onShoppingListChange', () => {
    const event = { value: 'water-bottle'};
    component.onShoppingListChange(event);
  });

  it('getPassportDetails', () => {
    const event = { value: 'yes'};
    component.getPassportDetails(event);
  });

  it('getInputValue with  Name as val', () => {
    const event = {target: { value: 'Dinesh'}};
    component.getInputValue(event, 'Name');
  });

  it('getInputValue with address as val', () => {
    const event = {target: { value: 'Noida'}};
    component.getInputValue(event, 'Address');
  });

  it('getInputValue with seatNo as val', () => {
    const event = {target: { value: 6}};
    component.getInputValue(event, 'seatNo');
  });

  it('getInputValue with passportNo as val', () => {
    const event = {target: { value: 3323434235332}};
    component.getInputValue(event, 'passportNo');
  });

  it('getServiceName', () => {
    component.services = [{
      id: 1,
      serviceName: 'onboard-food',
      checked: false
    }, {
      id: 2,
      serviceName: 'extra-baggage',
      checked: true
    }];
    const event = { source: {name: 'onboard-food'} };
    component.getServiceName(event);
  });

  it('getMealType', () => {
    const event = { value: 'veg'};
    component.getMealType(event);
  });

  it('cancel', () => {
    component.cancel();
  });

  it('getServices', () => {
    const result = [{
        checked: false,
        id: 1,
        price: '$800',
        serviceName: 'onboard-food'
      },
      {
        checked: false,
        id: 2,
        price: '$500',
        serviceName: 'extra-baggage'
      }];
    const service = fixture.componentRef.injector.get(GetAdminDataService);
    const spy = spyOn(service, 'getJsonData').and.returnValue(of(result));
    component.getServices();
    expect(spy).toHaveBeenCalled();
  });

  it('getItems', () => {
    const result =  [{
      id: 1,
      itemName: 'travel-pouch',
      price: '$200',
      quantity: 50
    },
    {
      id: 2,
      itemName: 'water-bottle',
      price: '$50',
      quantity: 100
    },
    {
      id: 3,
      itemName: 'eye-cover',
      price: '$100',
      quantity: 100
    }];
    const service = fixture.componentRef.injector.get(GetAdminDataService);
    const spy = spyOn(service, 'getJsonData').and.returnValue(of(result));
    component.getItems();
    expect(spy).toHaveBeenCalled();
  });
});
