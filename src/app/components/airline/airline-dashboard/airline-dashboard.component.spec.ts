import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {SocialAuthService, SocialLoginModule} from 'angularx-social-login';
import {of} from 'rxjs';
import {GetAdminDataService} from 'src/app/shared/services/admin/get-admin-data.service';
import {AirlineDashboardComponent} from '../airline-dashboard/airline-dashboard.component';
import {SeatMapComponent} from '../seat-map/seat-map.component';


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

describe('AirlineDashboardComponent', () => {
  let component: AirlineDashboardComponent;
  let fixture: ComponentFixture<AirlineDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AirlineDashboardComponent],
      imports: [
        SocialLoginModule,
        // RouterTestingModule,
        MatDialogModule,
        FormsModule,
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
    fixture = TestBed.createComponent(AirlineDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // eslint-disable-next-line max-len
  it('should call Router.navigateByUrl("login")', inject([Router], (router: Router) => {
    // eslint-disable-next-line no-unused-vars
    const spy = spyOn(router, 'navigateByUrl');
    expect(component).toBeTruthy();
  }));

  it('getFlightsData', () => {
    const result = {
      flights: [{
        id: 1,
        flightName: 'Go Air',
        Source: 'Pune',
        Destination: 'Udaipur',
        image: 'go-air-indigo.jpg',
        departureTime: '20:55',
        arrivalTime: '02:05',
        // eslint-disable-next-line max-len
        shortDescription: 'GoAir is an Indian low-cost airline based in Mumbai, India. It is owned by the Indian business conglomerate Wadia Group.',
      }],
      passengers: [{
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
      }],
    };
    const service = fixture.componentRef.injector.get(GetAdminDataService);
    const spy = spyOn(service, 'getJsonData').and.returnValue(of(result));
    component.getFlightsData();
    expect(spy).toHaveBeenCalled();
  });


  it('showSeatMap', () => {
    const result = [];
    spyOn(component.dialog, 'open').and.returnValue({afterClosed: () =>
      of(result)} as MatDialogRef<SeatMapComponent>);
    component.showSeatMap('SpiceJet');
  });

  it('setStep', () => {
    component.setStep(1);
  });

  it('getPassData', () => {
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
    component.flights = [{
      id: 1,
      flightName: 'Go Air',
      Source: 'Pune',
      Destination: 'Udaipur',
      image: 'go-air-indigo.jpg',
      departureTime: '20:55',
      arrivalTime: '02:05',
      // eslint-disable-next-line max-len
      shortDescription: 'GoAir is an Indian low-cost airline based in Mumbai, India. It is owned by the Indian business conglomerate Wadia Group.',
      totalPassengers: 2,
    }];
    component.getPassData('SpiceJet', 0);
  });

  // eslint-disable-next-line max-len
  it('should call Router.navigateByUrl("login")', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    component.logout();
    expect(spy).toHaveBeenCalledWith('/login');
  }));
});
