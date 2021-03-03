import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {GetAdminDataService} from './get-admin-data.service';


describe('GetAdminDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: GetAdminDataService = TestBed.inject(GetAdminDataService);
    expect(service).toBeTruthy();
  });

  it('getJsonData', () => {
    const service: GetAdminDataService = TestBed.inject(GetAdminDataService);
    service.getJsonData('flights');
  });

  it('setFlightsData', () => {
    const service: GetAdminDataService = TestBed.inject(GetAdminDataService);
    const data = [{
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
    service.setFlightsData(data);
  });

  it('getusersData', () => {
    const service: GetAdminDataService = TestBed.inject(GetAdminDataService);
    service.getUsersData();
  });

  it('setPassengersData', () => {
    const service: GetAdminDataService = TestBed.inject(GetAdminDataService);
    const data = [{
      id: 1,
      name: 'Nandani',
      flightName: 'Go Air',
      checkIn: true,
      inFlight: true,
      wheelChair: false,
      withInfants: false,
      specialMeals: 'Non-veg',
      seatNumber: 5,
      passport: 'Yes',
      passportNumber: '121312324124214',
      address: 'Nigdi',
      DOB: '06-12-1992',
      ancillaryServices: 'Yes',
      serviceName: ['extra-baggage'],
      productsName: [],
    }];
    service.setPassengersData(data);
  });

  it('getPassengersData', () => {
    const service: GetAdminDataService = TestBed.inject(GetAdminDataService);
    service.getPassengersData();
  });

  it('getUrl', () => {
    const service: GetAdminDataService = TestBed.inject(GetAdminDataService);
    service.getUrl('test');
  });
});
