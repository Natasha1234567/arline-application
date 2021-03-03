/* eslint-disable new-cap */
import {Component, OnInit, Input, Output,
  EventEmitter, OnDestroy} from '@angular/core';
import {GetAdminDataService} from '../../../shared/services/admin/get-admin-data.service';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {Constants} from 'src/app/shared/config';


@Component({
  selector: 'app-seat-map',
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.scss'],
})


export class SeatMapComponent implements OnInit, OnDestroy {
  bookedSeatMap = Constants.bookedSeatMap;
  @Input() flightName: any;
  @Input() passData: any;
  jsonData: any;
  allPassengers: any;
  seats = [];
  status = '';
  passengers = [];
  @Output() seatsData = new EventEmitter();
  subscriptions$: Subscription[] = [];

  constructor(private adminService: GetAdminDataService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.status = localStorage.getItem('status');
    if ( this.flightName === undefined) {
      this.flightName = localStorage.getItem('flightName');
    }
    this.allPassengers = this.status !== '' && this.flightName !== '' ?
    this.getPassengersData() : [];
    if (this.allPassengers && this.allPassengers.length > 0) {
      this.getSeatMap();
    }
  }

  getPassengersData() {
    this.subscriptions$.push(
        this.adminService.getPassengersData().subscribe((result) => {
          if (result !== undefined && result.length > 0) {
            this.allPassengers = result;
            this.getSeatMap();
          } else {
            this.adminService.getJsonData('passengers').subscribe((data) => {
              this.allPassengers = data;
              this.getSeatMap();
            });
          }
        }));
  }

  getSeatMap() {
    if (this.status === 'checkIn') {
      this.allPassengers.forEach((element) => {
        const index = this.seats.length > 0 ?
       this.seats.findIndex( (seat) => seat.seatNo === element.seatNumber) : -1;
        if (element.flightName === this.flightName && index === -1) {
          const data = this.seats && this.seats.length ?
          this.seats.find( (x) => x.name === element.name) : undefined;
          if (data === undefined ) {
            this.seats.push({
              checkIn: element.checkIn,
              seatNo: parseInt(element.seatNumber, 10),
              wheelChair: element.wheelChair,
              isInfants: element.withInfants,
              name: element.name});
          } else {
            data.seatNo = parseInt(element.seatNumber, 10);
          }
        }
      });
    } else if (this.status === 'inFlight') {
      this.allPassengers.forEach((element) => {
        const index = this.seats.length > 0 ?
        this.seats.findIndex((seat) => seat.seatNo === element.seatNumber) : -1;
        if (element.specialMeals !== '' &&
        element.flightName === this.flightName && index === -1) {
          this.seats.push({
            mealType: element.specialMeals, seatNo: element.seatNumber});
        } else if (element.specialMeals !== '' &&
        element.flightName === this.flightName && index > -1) {
          this.seats[index].mealType = element.seatNumber ===
          this.seats[index].seatNo ? element.specialMeals !==
          this.seats[index].mealType ? element.specialMeals :
          this.seats[index].mealType : this.seats[index].mealType;
        }
      });
    } else {
      this.allPassengers.forEach((element) => {
        if (element.specialMeals !== '' &&
         element.flightName === this.flightName) {
          this.passengers.push(element);
          this.seats.push({
            checkIn: element.checkIn,
            mealType: element.specialMeals,
            seatNo: element.seatNumber});
        }
      });
    }
    this.updateSeatMap();
  }

  updateSeatMap() {
    if (this.status === 'checkIn') {
      this.bookedSeatMap.forEach((ele) => {
        const index = this.seats.findIndex( (x) => x.seatNo === ele.seatNo);
        if ( index > -1) {
          ele.color = this.seats[index].checkIn ?
          'blue' : this.seats[index].wheelChair ? 'blueViolet' : this.seats[index].withInfants ? 'deeppink' :
          !this.seats[index].checkIn ? 'yellow' : 'grey';
        } else {
          ele.color = 'grey';
        }
      });
    } else if (this.status === 'inFlight') {
      this.seats.forEach((ele) => {
        // eslint-disable-next-line max-len
        const index = this.bookedSeatMap.findIndex((x) => x.seatNo === ele.seatNo);
        if (index > -1) {
          this.bookedSeatMap[index].color = ele.mealType === 'Veg' ?
          'green' : 'red';
        }
      });
    } else {
      this.seats.forEach((ele) => {
        // eslint-disable-next-line max-len
        const index = this.bookedSeatMap.findIndex((x) => x.seatNo === ele.seatNo);
        if (index > -1 && !ele.checkIn) {
          this.bookedSeatMap[index].color = ele.mealType === 'Veg' ?
          'green' : ele.mealType === 'Non-veg' ? 'red' : 'blue';
        } else if (index > -1 && ele.checkIn) {
          this.bookedSeatMap[index].color = ele.mealType === 'Veg' ?
          'brown' : ele.mealType === 'Non-veg' ? 'cyan' : 'yellow';
        }
      });
    }
  }

  cancel() {
    this.dialog.closeAll();
  }

  handleButtonClick(seatNo: number) {
    const index = this.seats.findIndex( (x) => x.seatNo === seatNo);
    this.seats[index].checkIn = index > -1 ?
    this.seats[index].checkIn ? false : true : this.seats[index].checkIn;

    const ind = this.bookedSeatMap.findIndex( (y) => y.seatNo === seatNo);
    this.bookedSeatMap[ind].color = ind > -1 ?
    this.bookedSeatMap[ind].color === 'blue' ? 'yellow' : 'blue' : this.bookedSeatMap[ind].color;
    this.seatsData.emit(this.seats);
  }

  ngOnDestroy() {
    if (this.subscriptions$) {
      this.subscriptions$.forEach((subscription) => subscription.unsubscribe());
    }
  }
}
