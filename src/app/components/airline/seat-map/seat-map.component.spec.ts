import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {of} from 'rxjs';
import {Constants} from 'src/app/shared/config';
import {GetAdminDataService} from 'src/app/shared/services/admin/get-admin-data.service';

import {SeatMapComponent} from './seat-map.component';

describe('SeatMapComponent', () => {
  let component: SeatMapComponent;
  let fixture: ComponentFixture<SeatMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeatMapComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatInputModule],
      providers: [GetAdminDataService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatMapComponent);
    component = fixture.componentInstance;
    component.bookedSeatMap = Constants.bookedSeatMap;
    fixture.detectChanges();
  });

  it('should create', () => {
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
    // eslint-disable-next-line no-unused-vars
    const spy = spyOn(service, 'getPassengersData').and.returnValue(of(result));
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    localStorage.setItem('status', 'checkIn');
    localStorage.setItem('flightName', 'Go Air');
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
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('ngOnInit with empty result array', () => {
    localStorage.setItem('status', 'inFlight');
    localStorage.setItem('flightName', 'Go Air');
    const result = [];
    const jsonResult = [{
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
    const spy1 = spyOn(service, 'getJsonData').and.returnValue(of(jsonResult));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(spy1).toHaveBeenCalled();
  });

  it('getSeatMap', () => {
    component.status = 'inFlight';
    localStorage.setItem('flightName', 'Go Air');
    component.seats = [{
      seatNo: 5,
      mealType: 'Non-veg',
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
    }];
    component.getSeatMap();
  });

  it('getSeatMap with status as checkIn', () => {
    component.status = 'checkIn';
    localStorage.setItem('flightName', 'Go Air');
    component.seats = [{
      seatNo: 5,
      mealType: 'Non-veg',
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
    }];
    component.getSeatMap();
  });

  it('getSeatMap with status as test', () => {
    component.status = 'test';
    component.flightName = 'Go Air';
    component.seats = [{
      seatNo: 7,
      mealType: 'Non-veg',
      name: 'Nandini',
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
    }];
    component.getSeatMap();
  });

  it('cancel', () => {
    component.cancel();
  });

  it('handleButtonClick', () => {
    component.seats = [{
      seatNo: 7,
      mealType: 'Non-veg',
      name: 'Nandini',
      checkIn: false,
    }];
    component.handleButtonClick(7);
  });

  it('handleButtonClick with checkIn as true', () => {
    component.seats = [{
      seatNo: 7,
      mealType: 'Non-veg',
      name: 'Nandini',
      checkIn: true,
    }];
    component.handleButtonClick(7);
  });

  it('updateSeatMap with checkIn as status', () => {
    component.status = 'checkIn';
    component.seats = [{
      seatNo: 8,
      mealType: 'Non-veg',
      name: 'Nandini',
      checkIn: false,
      wheelChair: true,
    }];
    component.updateSeatMap();
  });

  it('updateSeatMap with checkIn as status and for infants', () => {
    component.status = 'checkIn';
    component.seats = [{
      seatNo: 8,
      mealType: 'Non-veg',
      name: 'Nandini',
      checkIn: false,
      wheelChair: false,
      withInfants: true,
    }];
    component.updateSeatMap();
  });

  it('updateSeatMap with inFlight as status and mealType as Veg', () => {
    component.status = 'inFlight';
    component.seats = [{
      seatNo: 9,
      mealType: 'Veg',
      name: 'Nandini',
    }];
    component.updateSeatMap();
  });

  it('updateSeatMap with test as status and mealType as Veg', () => {
    component.status = 'test';
    component.seats = [{
      seatNo: 9,
      mealType: 'Veg',
      name: 'Nandini',
      checkIn: false,
    }];
    component.updateSeatMap();
  });

  it('updateSeatMap with test as status and mealType as Veg', () => {
    component.status = 'test';
    component.seats = [{
      seatNo: 9,
      mealType: 'Veg',
      name: 'Nandini',
      checkIn: true,
    }];
    component.updateSeatMap();
  });

  it('ngOnInit with empty status and flightName', () => {
    component.status = '';
    component.flightName = '';
    component.ngOnInit();
  });

  it('updateSeatMap with test as status and mealType as null', () => {
    component.status = 'test';
    component.seats = [{
      seatNo: 9,
      mealType: '',
      name: 'Nandini',
      checkIn: true,
    }];
    component.updateSeatMap();
  });

  // eslint-disable-next-line max-len
  it('updateSeatMap with test as status and mealType as null and checkIn as false', () => {
    component.status = 'test';
    component.seats = [{
      seatNo: 9,
      mealType: '',
      name: 'Nandini',
      checkIn: false,
    }];
    component.updateSeatMap();
  });
});
