import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PassengersListComponent} from './passengers-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GetAdminDataService} from 'src/app/shared/services/admin/get-admin-data.service';
import {of} from 'rxjs';
import {AddModalComponent} from 'src/app/shared/components/add-modal/add-modal.component';
import {UpdateModalComponent} from 'src/app/shared/components/update-modal/update-modal.component';

describe('PassengersListComponent', () => {
  let component: PassengersListComponent;
  let fixture: ComponentFixture<PassengersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PassengersListComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTableModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    localStorage.setItem('status', 'inFlight');
    component.ngOnInit();
  });

  it('ngOnInit as status checkIn', () => {
    localStorage.setItem('status', 'checkIn');
    component.ngOnInit();
  });

  it('getPassengersData', () => {
    const result = [{
      DOB: '06-12-1992',
      address: 'Nigdi',
      ancillaryServices: 'Yes',
      checkIn: true,
      flightName: 'Go Air',
      id: 1,
      inFlight: true,
      name: 'Nandani',
      passport: 'Yes',
      passportNumber: '121312324124214',
      productsName: [],
      seatNumber: 5,
      serviceName: ['extra-baggage'],
      specialMeals: 'Non-veg',
      wheelChair: false,
      withInfants: false,
    }];
    const service = fixture.componentRef.injector.get(GetAdminDataService);
    const spy = spyOn(service, 'getPassengersData').and.returnValue(of(result));
    component.getPassengersData();
    expect(spy).toHaveBeenCalled();
  });

  it('add', () => {
    const result = {
      id: 1,
      productsName: ['eye-cover'],
      specialMeals: 'Non-veg',
      serviceName: ['onboard-food'],
    };
    component.passengers = [{
      DOB: '06-12-1992',
      address: 'Nigdi',
      ancillaryServices: 'Yes',
      checkIn: true,
      flightName: 'Go Air',
      id: 1,
      inFlight: true,
      name: 'Nandani',
      passport: 'Yes',
      passportNumber: '121312324124214',
      productsName: [],
      seatNumber: 5,
      serviceName: ['extra-baggage'],
      specialMeals: 'Non-veg',
      wheelChair: false,
      withInfants: false,
    }];
    spyOn(component.dialog, 'open').and.returnValue({afterClosed: () =>
      of(result)} as MatDialogRef<AddModalComponent>);
    component.add(1);
  });

  it('add for else condition', () => {
    const result = {
      id: 1,
      productsName: [],
      specialMeals: '',
      serviceName: [],
    };
    component.passengers = [{
      DOB: '06-12-1992',
      address: 'Nigdi',
      ancillaryServices: 'Yes',
      checkIn: true,
      flightName: 'Go Air',
      id: 1,
      inFlight: true,
      name: 'Nandani',
      passport: 'Yes',
      passportNumber: '121312324124214',
      productsName: [],
      seatNumber: 5,
      serviceName: ['extra-baggage'],
      specialMeals: 'Non-veg',
      wheelChair: false,
      withInfants: false,
    }];
    spyOn(component.dialog, 'open').and.returnValue({afterClosed: () =>
      of(result)} as MatDialogRef<AddModalComponent>);
    component.add(1);
  });


  it('edit', () => {
    const result = {
      id: 1,
      seatNumber: 6,
      specialMeals: 'Veg',
    };
    component.passengers = [{
      DOB: '06-12-1992',
      address: 'Nigdi',
      ancillaryServices: 'Yes',
      checkIn: true,
      flightName: 'Go Air',
      id: 1,
      inFlight: true,
      name: 'Nandani',
      passport: 'Yes',
      passportNumber: '121312324124214',
      productsName: [],
      seatNumber: 5,
      serviceName: ['extra-baggage'],
      specialMeals: 'Non-veg',
      wheelChair: false,
      withInfants: false,
    }];
    component.allPassengers = [{
      DOB: '06-12-1992',
      address: 'Nigdi',
      ancillaryServices: 'Yes',
      checkIn: true,
      flightName: 'Go Air',
      id: 1,
      inFlight: true,
      name: 'Nandani',
      passport: 'Yes',
      passportNumber: '121312324124214',
      productsName: [],
      seatNumber: 5,
      serviceName: ['extra-baggage'],
      specialMeals: 'Non-veg',
      wheelChair: false,
      withInfants: false,
    },
    {
      id: 2,
      name: 'Savi',
      flightName: 'SpiceJet',
      checkIn: true,
      inFlight: false,
      wheelChair: true,
      withInfants: false,
      specialMeals: '',
      seatNumber: 4,
      passport: 'Yes',
      passportNumber: '4354364776786',
      address: 'Hinjewadi',
      DOB: '28-08-1999',
      ancillaryServices: 'No',
      productsName: ['eye-cover'],
      serviceName: [],
    }];
    spyOn(component.dialog, 'open').and.returnValue({afterClosed: () =>
      of(result)} as MatDialogRef<UpdateModalComponent>);
    component.edit(1);
  });

  it('getData', () => {
    const result = [{
      id: 1,
      flightName: 'Go Air',
      Source: 'Pune',
      Destination: 'Udaipur',
      image: 'go-air-indigo.jpg',
      departureTime: '20:55',
      arrivalTime: '02:05',
      // eslint-disable-next-line max-len
      shortDescription: 'GoAir is an Indian low-cost airline based in Mumbai, India. It is owned by the Indian business conglomerate Wadia Group.',
    }];
    const service = fixture.componentRef.injector.get(GetAdminDataService);
    const spy = spyOn(service, 'getJsonData').and.returnValue(of(result));
    component.getData();
    expect(spy).toHaveBeenCalled();
  });

  it('getTableData', () => {
    component.allPassengers = [{
      DOB: '06-12-1992',
      address: 'Nigdi',
      ancillaryServices: 'Yes',
      checkIn: true,
      flightName: 'Go Air',
      id: 1,
      inFlight: true,
      name: 'Dinesh',
      passport: 'Yes',
      passportNumber: '121312324124214',
      productsName: [],
      seatNumber: 12,
      serviceName: ['extra-baggage'],
      specialMeals: 'Non-veg',
      wheelChair: false,
      withInfants: false,
    }, {
      id: 2,
      name: 'Savi',
      flightName: 'SpiceJet',
      checkIn: true,
      inFlight: false,
      wheelChair: true,
      withInfants: false,
      specialMeals: '',
      seatNumber: 4,
      passport: 'Yes',
      passportNumber: '4354364776786',
      address: 'Hinjewadi',
      DOB: '28-08-1999',
      ancillaryServices: 'No',
      productsName: ['eye-cover'],
      serviceName: [],
    }];
    component.passengers = [{
      DOB: '06-12-1992',
      address: 'Nigdi',
      ancillaryServices: 'Yes',
      checkIn: true,
      flightName: 'Go Air',
      id: 1,
      inFlight: true,
      name: 'Nandani  ',
      passport: 'Yes',
      passportNumber: '121312324124214',
      productsName: [],
      seatNumber: 5,
      serviceName: ['extra-baggage'],
      specialMeals: 'Non-veg',
      wheelChair: false,
      withInfants: false,
    }];
    component.flightName = 'Go Air';
    component.getTableData();
  });

  it('getTableData for else condition', () => {
    component.allPassengers = [{
      DOB: '06-12-1992',
      address: 'Nigdi',
      ancillaryServices: 'Yes',
      checkIn: true,
      flightName: 'Go Air',
      id: 1,
      inFlight: true,
      name: 'Nandini',
      passport: 'Yes',
      passportNumber: '121312324124214',
      productsName: [],
      seatNumber: 12,
      serviceName: ['extra-baggage'],
      specialMeals: 'Non-veg',
      wheelChair: false,
      withInfants: false,
    }, {
      id: 2,
      name: 'Savi',
      flightName: 'SpiceJet',
      checkIn: true,
      inFlight: false,
      wheelChair: true,
      withInfants: false,
      specialMeals: '',
      seatNumber: 4,
      passport: 'Yes',
      passportNumber: '4354364776786',
      address: 'Hinjewadi',
      DOB: '28-08-1999',
      ancillaryServices: 'No',
      productsName: ['eye-cover'],
      serviceName: [],
    }];
    component.passengers = [{
      DOB: '06-12-1992',
      address: 'Nigdi',
      ancillaryServices: 'Yes',
      checkIn: true,
      flightName: 'Go Air',
      id: 1,
      inFlight: true,
      name: 'Nandani',
      passport: 'Yes',
      passportNumber: '121312324124214',
      productsName: [],
      seatNumber: 5,
      serviceName: ['extra-baggage'],
      specialMeals: 'Non-veg',
      wheelChair: false,
      withInfants: false,
    }];
    component.flightName = 'Go Air';
    component.getTableData();
  });
});
