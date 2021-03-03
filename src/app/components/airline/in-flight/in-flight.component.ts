import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {GetAdminDataService} from 'src/app/shared/services/admin/get-admin-data.service';


// eslint-disable-next-line new-cap
@Component({
  selector: 'app-in-flight',
  templateUrl: './in-flight.component.html',
  styleUrls: ['./in-flight.component.scss'],
})

export class InFlightComponent implements OnInit, OnDestroy {
  name: string;
  allPassengers: any;
  checkInPassengersList = [];
  seats = [];
  subscriptions$: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private adminService: GetAdminDataService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.name = params.name;
      this.getPassengersData();
    });
    localStorage.setItem('status', 'inFlight');
  }

  getPassengersData() {
    this.subscriptions$.push(
        this.adminService.getPassengersData().subscribe((result) => {
          this.allPassengers = result.length === 0 ?
          this.getAPIPassData() : result;
          if (this.allPassengers) {
            this.getCheckedInPassengersData();
          }
        }));
  }

  getCheckedInPassengersData() {
    this.allPassengers.forEach((element) => {
      if (element.checkIn === true && element.flightName === this.name) {
        this.checkInPassengersList.push(element);
        this.seats.push(element.seatNumber);
      }
    });
  }

  getAPIPassData() {
    this.subscriptions$.push(
        this.adminService.getJsonData('passengers').subscribe((data) => {
          if (data !== undefined && data.length > 0) {
            this.allPassengers = data;
            if ( this.allPassengers) {
              this.getCheckedInPassengersData();
            }
            return data;
          }
        }));
  }

  getUpdatedCheckedInSeats(event) {
    event.forEach((data) => {
      const index =
       this.allPassengers.findIndex( (x) => x.seatNumber === data.seatNo);
      this.allPassengers[index].checkIn =
        index > -1 ? data.checkIn : this.allPassengers[index].checkIn;
    });
    this.adminService.setPassengersData(this.allPassengers);
    this.getCheckedInPassengersData();
  }

  ngOnDestroy() {
    if (this.subscriptions$) {
      this.subscriptions$.forEach((subscription) => subscription.unsubscribe());
    }
  }
}
