import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocialAuthService} from 'angularx-social-login';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {GetAdminDataService} from './../../../shared/services/admin/get-admin-data.service';
import {MatTableDataSource} from '@angular/material/table';
import {SeatMapComponent} from '../seat-map/seat-map.component';
import {MatDialog} from '@angular/material/dialog';
import {forkJoin, Subscription} from 'rxjs';
import {Constants} from 'src/app/shared/config';

// eslint-disable-next-line new-cap
@Component({
  selector: 'app-airline-dashboard',
  templateUrl: './airline-dashboard.component.html',
  styleUrls: ['./airline-dashboard.component.scss'],
})

export class AirlineDashboardComponent implements OnInit, OnDestroy {
  isAirline = false;
  mode = new FormControl('side');
  flights: any;
  step = Constants.airlineStep;
  opened = false;
  passengers: any;
  displayedColumns: string[] = Constants.airlineDataSource;
  dataSource: MatTableDataSource<any>;
  flightName: any;
  subscriptions$: Subscription[] = [];

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private adminService: GetAdminDataService,
    public dialog: MatDialog) {}


  ngOnInit() {
    this.isAirline =
    localStorage.getItem('UserType') === 'airline' ? true : false;
    if (this.isAirline === false) {
      this.router.navigateByUrl('/login');
    }
    this.getFlightsData();
  }


  logout() {
    this.authService.signOut();
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  getFlightsData() {
    const flights = this.adminService.getJsonData('flights');
    const passengers = this.adminService.getJsonData('passengers');
    this.subscriptions$.push(
        forkJoin([flights, passengers]).subscribe((data) => {
          this.flights = data[0];
          this.passengers = data[1];
          this.adminService.setFlightsData(this.flights);
          this.adminService.setPassengersData(this.passengers);
        }, (err) => console.log('Error on Init', err) ),
    );
  }

  getPassData(flightName, i) {
    let count = 0;
    this.flightName = flightName;
    this.passengers.forEach((element) => {
      if (element.flightName === flightName) {
        count = count + 1;
      }
    });
    this.flights[i].totalPassengers = count;
  }

  setStep(index: number) {
    this.step = index;
  }

  showSeatMap(flightName: string) {
    localStorage.setItem('status', 'all');
    localStorage.setItem('flightName', flightName);
    const dialogRef = this.dialog.open(SeatMapComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Result', result);
    });
  }

  ngOnDestroy() {
    if (this.subscriptions$) {
      this.subscriptions$.forEach((subscription) => subscription.unsubscribe());
    }
  }
}
