import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {GetAdminDataService} from './../../../shared/services/admin/get-admin-data.service';
import {MatTableDataSource} from '@angular/material/table';
import {AddModalComponent} from '../../../shared/components/add-modal/add-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {UpdateModalComponent} from '../../../shared/components/update-modal/update-modal.component';
import {Constants} from 'src/app/shared/config';

@Component({
  selector: 'app-passengers-list',
  templateUrl: './passengers-list.component.html',
  styleUrls: ['./passengers-list.component.scss'],
})

export class PassengersListComponent implements OnInit {
  jsonData: any;
  flights: any;
  allPassengers: any;
  @Input() flightName: any;
  passengers = [];
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  status = '';
  @Output() passengerData = new EventEmitter();
  constructor(
    private adminService: GetAdminDataService,
    public dialog: MatDialog) { }


  ngOnInit() {
    // tslint:disable-next-line: radix
    this.status = localStorage.getItem('status');
    if (this.status !== undefined && this.status === 'inFlight') {
      this.displayedColumns = Constants.flightDataSource;
    } else if (this.status !== undefined && this.status === 'checkIn') {
      this.displayedColumns = Constants.checkInDataSource;
    }
    this.getPassengersData();
  }

  getPassengersData() {
    this.adminService.getPassengersData().subscribe((data) => {
      this.allPassengers = data.length > 0 ? data : this.getData();
      if (this.allPassengers && this.allPassengers.length > 0) {
        this.getTableData();
      }
    });
  }

  add(id) {
    const index = this.passengers.findIndex((x) => x.id === id);

    const dialogRef = this.dialog.open(AddModalComponent, {
      width: '300px',
      data: {data: this.passengers[index], UserType: 'airline'},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const passIndex = this.passengers.findIndex( (x) => x.id === result.id);

        this.passengers[passIndex].productsName = result.productsName.length >
        0 ? result.productsName : this.passengers[passIndex].productsName;
        this.passengers[passIndex].specialMeals = result.specialMeals !==
        '' ? result.specialMeals : this.passengers[passIndex].specialMeals;
        this.passengers[passIndex].serviceName = result.serviceName !==
        undefined ? result.serviceName : this.passengers[passIndex].serviceName;
        this.passengers[passIndex].ancillaryServices = result.serviceName.
            length > 0 ? 'Yes' : 'No';
        this.dataSource = new MatTableDataSource(this.passengers);
      }
    });
  }

  edit(id: number) {
    const index = this.passengers.findIndex((x) => x.id === id);

    const dialogRef = this.dialog.open(UpdateModalComponent, {
      width: '300px',
      data: {passData: this.passengers[index], UserType: 'airline'},
    });

    dialogRef.afterClosed().subscribe((result) => {
      const passIndex = this.passengers.findIndex( (x) => x.id === result.id);
      this.passengers[passIndex].specialMeals = result.specialMeals;
      this.passengers[passIndex].seatNumber = result.seatNumber;
      this.dataSource = new MatTableDataSource(this.passengers);
      this.updatePassData(this.passengers);
    });
  }

  getData() {
    this.adminService.getJsonData('passengers').subscribe((data) => {
      if (data !== undefined && data.length > 0) {
        this.allPassengers = data;
        if ( this.allPassengers) {
          this.getTableData();
        }
        return data;
      }
    });
  }

  getTableData() {
    this.allPassengers.forEach((element) => {
      const index = this.passengers ?
       this.passengers.findIndex( (x) => x.name === element.name) : -1;
      if (element.flightName === this.flightName && index === -1) {
        this.passengers.push(element);
      } else if ( element.flightName === this.flightName && index > -1) {
        this.passengers[index].checkIn = element.checkIn;
      }
    });
    this.dataSource = new MatTableDataSource(this.passengers);
  }

  updatePassData(passData: any) {
    passData.forEach((element) => {
      const index = this.allPassengers.findIndex((x) =>
        x.name === element.name);
      this.allPassengers[index] = index > -1 ?
      element : this.allPassengers[index];
    });
    this.adminService.setPassengersData(this.allPassengers);
  }
}
