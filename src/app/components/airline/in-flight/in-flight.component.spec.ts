import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture,
  fakeAsync, TestBed, tick} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of, Subject} from 'rxjs';
import {GetAdminDataService} from 'src/app/shared/services/admin/get-admin-data.service';
import {PassengersListComponent} from '../passengers-list/passengers-list.component';
import {SeatMapComponent} from '../seat-map/seat-map.component';

import {InFlightComponent} from './in-flight.component';

class MockActivatedRoute {
  queryParams = new Subject<any>();
}

describe('InFlightComponent', () => {
  let component: InFlightComponent;
  let fixture: ComponentFixture<InFlightComponent>;
  let route: MockActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InFlightComponent,
        PassengersListComponent,
        SeatMapComponent,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        MatTableModule,
        MatInputModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InFlightComponent);
    component = fixture.componentInstance;
    route = (TestBed.inject(ActivatedRoute) as unknown as MockActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    route.queryParams.next({name: 'Go Air'});
    tick();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('getPassengersData', () => {
    component.name = 'Go Air';
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
    component.name = 'Go Air';
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
    const spy = spyOn(service, 'getJsonData').and.returnValue(of(result));
    component.getAPIPassData();
    expect(spy).toHaveBeenCalled();
  });

  it('getUpdatedCheckedInSeats', () => {
    const event = [{
      seatNo: 5,
      checkIn: false,
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
    }];
    component.getUpdatedCheckedInSeats(event);
  });
});
