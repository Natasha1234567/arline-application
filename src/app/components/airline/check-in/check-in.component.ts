import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GetAdminDataService} from '../../../shared/services/admin/get-admin-data.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})

export class CheckInComponent implements OnInit, OnDestroy {
  name = '';
  allPassengers = [];
  checkInPassengersList = [];
  seats = [];
  subscriptions$: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private adminService: GetAdminDataService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.name = params.name;
      this.getPassengersData();
    });
    localStorage.setItem('status', 'checkIn');
  }

  getPassengersData() {
    this.subscriptions$.push(
        this.adminService.getPassengersData().subscribe((result) => {
          if (result.length > 0) {
            this.allPassengers = result;
          } else {
            this.getAPIPassData();
          }
        }));
  }

  getAPIPassData() {
    this.subscriptions$.push(
        this.adminService.getJsonData('passengers').subscribe((data) => {
          if (data !== undefined && data.length > 0) {
            this.allPassengers = data;
          }
        }));
  }

  getUpdatedCheckedInSeats(event) {
    let counter = 0;
    event.forEach((data) => {
      const index = this.allPassengers.findIndex( (x) => x.name === data.name);
      this.allPassengers[index].checkIn = index > -1 ?
      data.checkIn : this.allPassengers[index].checkIn;
      counter = counter + 1;
      if (counter === event.length) {
        this.adminService.setPassengersData(this.allPassengers);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscriptions$) {
      this.subscriptions$.forEach((subscription) => subscription.unsubscribe());
    }
  }
}
