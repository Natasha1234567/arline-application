import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, fakeAsync,
  TestBed, tick} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of, Subject} from 'rxjs';
import {GetAdminDataService} from 'src/app/shared/services/admin/get-admin-data.service';
import {CheckedInPassengerComponent} from '../checked-in-passenger/checked-in-passenger.component';
import {PassengersListComponent} from '../passengers-list/passengers-list.component';
import {SeatMapComponent} from '../seat-map/seat-map.component';

import {CheckInComponent} from './check-in.component';

class MockActivatedRoute {
  queryParams = new Subject<any>();
}

describe('CheckInComponent', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;
  let route: MockActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckInComponent,
        PassengersListComponent,
        SeatMapComponent,
        CheckedInPassengerComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatTableModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.componentInstance;
    route = (TestBed.inject(ActivatedRoute) as unknown as MockActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    route.queryParams.next({name: 'Natasha'});
    tick();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

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

  it('getAPIPassData', () => {
    const result = {
      passengers: [{
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
      }]};
    const service = fixture.componentRef.injector.get(GetAdminDataService);
    const spy = spyOn(service, 'getJsonData').and.returnValue(of(result));
    component.getAPIPassData();
    expect(spy).toHaveBeenCalled();
  });

  it('getUpdatedCheckedInSeats', () => {
    const seatsMap = [{
      checkIn: true,
      isInfants: false,
      name: 'Nandani',
      seatNo: 5,
      wheelChair: false,
    }, {
      checkIn: true,
      isInfants: false,
      name: 'ThakurDas',
      seatNo: 1,
      wheelChair: true,
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
    }, {
      DOB: '06-12-1992',
      address: 'Nigdi',
      ancillaryServices: 'Yes',
      checkIn: true,
      flightName: 'Go Air',
      id: 1,
      inFlight: true,
      name: 'ThakurDas',
      passport: 'Yes',
      passportNumber: '1213123241242145',
      productsName: [],
      seatNumber: 1,
      serviceName: ['extra-baggage'],
      specialMeals: 'Non-veg',
      wheelChair: false,
      withInfants: false,
    }],
    component.getUpdatedCheckedInSeats(seatsMap);
  });
});
