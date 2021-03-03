import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {SocialAuthService, SocialLoginModule} from 'angularx-social-login';
import {of} from 'rxjs';
import {HeaderComponent} from 'src/app/core/header/header.component';
import {AddModalComponent} from 'src/app/shared/components/add-modal/add-modal.component';

import {DeleteModalComponent} from 'src/app/shared/components/delete-modal/delete-modal.component';

import {UpdateModalComponent} from 'src/app/shared/components/update-modal/update-modal.component';

import {GetAdminDataService} from 'src/app/shared/services/admin/get-admin-data.service';

import {AdminDashboardComponent} from './admin-dashboard.component';

class AuthServiceMock {
  private providers;
  signIn(providerId) {}
  signOut() {}
}

class MockRouter {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDashboardComponent, HeaderComponent],
      imports: [SocialLoginModule,
        RouterTestingModule,
        MatDialogModule,
        FormsModule,
        MatInputModule,
        MatPaginatorModule,
        MatSelectModule,
        MatTableModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatSidenavModule,
        MatIconModule,
      ],
      providers: [
        SocialAuthService,
        [{provide: SocialAuthService, useClass: AuthServiceMock}],
        [{provide: Router, useClass: MockRouter}],
        FormBuilder,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    jasmine.createSpy('navigateByUrl').and.callThrough();
    expect(component).toBeTruthy();
  });

  it('getFlightsData', () => {
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
    component.getFlightsData();
    expect(spy).toHaveBeenCalled();
  });

  it('getPassengersData', () => {
    component.selectedFlight = 'SpiceJet';
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
    component.flights = result;
    component.passengers = [{
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
    }];
    component.getPassengersData();
  });

  it('onFlightChange', () => {
    component.onFlightChange(1);
  });

  it('addNewPassenger', () => {
    const result = {
      name: 'Natasha',
      address: 'RoopSagar Road',
      seatNumber: 5,
      productsName: ['eye-cover'],
      specialMeals: 'Veg',
      serviceName: ['extra-baggage'],
      ancillaryServices: 'Yes',
      passport: 'Yes',
      DOB: '2020-12-03',
      passportNumber: 546465465474,
      flightName: 'SpiceJet',
    };
    component.passengers = [{
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
    }];
    spyOn(component.dialog, 'open').and.returnValue({afterClosed: () =>
      of(result)} as MatDialogRef<AddModalComponent>);
    component.addNewPassenger();
  });

  it('edit', () => {
    const result = {
      id: 2,
      name: 'Savi',
      address: 'RoopSagar Road',
      seatNumber: 5,
      productsName: ['eye-cover'],
      specialMeals: 'Veg',
      serviceName: ['extra-baggage'],
      ancillaryServices: 'Yes',
      passport: 'Yes',
      DOB: '2020-12-03',
      passportNumber: 546465465474,
      flightName: 'SpiceJet',
      checkIn: true,
      inFlight: false,
      wheelChair: true,
      withInfants: false,
    };
    component.passengers = [{
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
    }];
    spyOn(component.dialog, 'open').and.returnValue({afterClosed: () =>
      of(result)} as MatDialogRef<UpdateModalComponent>);
    component.edit(2);
  });

  it('delete', () => {
    const result = ['AS', 'SM', 'SI'];
    spyOn(component.dialog, 'open').and.returnValue({afterClosed: () =>
      of(result)} as MatDialogRef<DeleteModalComponent>);
    component.passengers = [{
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
    }];
    component.delete(2);
    expect(component.passengers[0].productsName).toEqual([]);
  });

  it('add', () => {
    const result = {
      id: 2,
      name: 'Savi',
      address: 'RoopSagar Road',
      seatNumber: 5,
      productsName: ['eye-cover'],
      specialMeals: 'Veg',
      serviceName: ['extra-baggage'],
      ancillaryServices: 'Yes',
      passport: 'Yes',
      DOB: '2020-12-03',
      passportNumber: 546465465474,
      flightName: 'SpiceJet',
      checkIn: true,
      inFlight: false,
      wheelChair: true,
      withInfants: false,
    };
    spyOn(component.dialog, 'open').and.returnValue({afterClosed: () =>
      of(result)} as MatDialogRef<DeleteModalComponent>);
    component.passengers = [{
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
    }];
    component.add(2);
  });

  it('add for else condition', () => {
    const result = {
      id: 2,
      name: 'Savi',
      address: 'RoopSagar Road',
      seatNumber: 5,
      productsName: [],
      specialMeals: '',
      serviceName: [],
      ancillaryServices: 'Yes',
      passport: '',
      DOB: '',
      passportNo: '',
      flightName: 'SpiceJet',
      checkIn: true,
      inFlight: false,
      wheelChair: true,
      withInfants: false,
    };
    spyOn(component.dialog, 'open').and.returnValue({afterClosed: () =>
      of(result)} as MatDialogRef<DeleteModalComponent>);
    component.passengers = [{
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
    }];
    component.add(2);
  });

  xit('applyFilter', () => {
    const event = {target: {value: 'onboard-food'}} as any;
    component.applyFilter(event);
  });


  it('delete for SM', () => {
    const result = ['AS', 'SM', 'SI'];
    spyOn(component.dialog, 'open').and.returnValue({afterClosed: () =>
      of(result)} as MatDialogRef<DeleteModalComponent>);
    component.passengers = [{
      id: 2,
      name: 'Savi',
      flightName: 'SpiceJet',
      checkIn: true,
      inFlight: false,
      wheelChair: true,
      withInfants: false,
      specialMeals: 'Non-veg',
      seatNumber: 4,
      passport: 'Yes',
      passportNumber: '4354364776786',
      address: 'Hinjewadi',
      DOB: '28-08-1999',
      ancillaryServices: 'No',
      productsName: ['eye-cover'],
    }];
    component.delete(2);
    expect(component.passengers[0].specialMeals).toEqual('');
  });


  it('delete for AS', () => {
    const result = ['AS', 'SM', 'SI'];
    spyOn(component.dialog, 'open').and.returnValue({afterClosed: () =>
      of(result)} as MatDialogRef<DeleteModalComponent>);
    component.passengers = [{
      id: 2,
      name: 'Savi',
      flightName: 'SpiceJet',
      checkIn: true,
      inFlight: false,
      wheelChair: true,
      withInfants: false,
      specialMeals: 'Non-veg',
      seatNumber: 4,
      passport: 'Yes',
      passportNumber: '4354364776786',
      address: 'Hinjewadi',
      DOB: '28-08-1999',
      ancillaryServices: 'Yes',
      productsName: ['eye-cover'],
    }];
    component.delete(2);
    expect(component.passengers[0].serviceName).toEqual([]);
  });
});
