/* eslint-disable no-multi-spaces */
import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {GetAdminDataService} from '../../../shared/services/admin/get-admin-data.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
// eslint-disable-next-line max-len
import {DeleteModalComponent} from './../../../shared/components/delete-modal/delete-modal.component';
// eslint-disable-next-line max-len
import {UpdateModalComponent} from './../../../shared/components/update-modal/update-modal.component';
// eslint-disable-next-line max-len
import {AddModalComponent} from './../../../shared/components/add-modal/add-modal.component';
import {Constants} from 'src/app/shared/config';

// eslint-disable-next-line new-cap
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})

export class AdminDashboardComponent implements OnInit {
  isAdmin = false;
  displayedColumns: string[] = Constants.airlineDataSource;
  dataSource: MatTableDataSource<any>;
  // eslint-disable-next-line new-cap
  @ViewChild(MatPaginator) paginator: MatPaginator;
  flights = [];
  selectedFlight = '';
  jsonData: any;
  passengers: any;

  constructor( private router: Router,
               private adminService: GetAdminDataService,
               public dialog: MatDialog) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('UserType') === 'admin' ? true : false;
    if (this.isAdmin === false) {
      this.router.navigateByUrl('/login');
    }
    this.getFlightsData();
  }


  getFlightsData() {
    this.adminService.getJsonData('flights').subscribe((result) => {
      if (result !== undefined && result.length > 0) {
        this.flights = result;
        this.adminService.getJsonData('passengers').subscribe((data) => {
          if (data !== undefined && data.length > 0) {
            this.passengers = data;
            this.getPassengersData();
          }
        });
      }
    });
  }


  getPassengersData() {
    if (this.selectedFlight === '' && this.passengers !== undefined) {
      this.dataSource = new MatTableDataSource(this.passengers);
      this.dataSource.paginator = this.paginator;
    } else if (this.selectedFlight !== '' &&
      this.passengers !== undefined && this.flights.length > 0) {
      const allPassengers = this.passengers;
      this.passengers = [];
      allPassengers.forEach((element) => {
        if (element.flightName === this.selectedFlight) {
          this.passengers.push(element);
        }
        if (element.ancillaryServices === 'No') {
          element.serviceName = [];
        }
      });
      this.dataSource = new MatTableDataSource(this.passengers);
      this.dataSource.paginator = this.paginator;
    }
  }

  onFlightChange(ev: any) {
    this.getPassengersData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  addNewPassenger() {
    const dialogRef = this.dialog.open(AddModalComponent, {
      width: '300px',
      data: {UserType: 'admin', data: this.flights},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const newPass = {
          id: this.passengers.length + 1,
          name: result.name,
          address: result.address,
          seatNumber: result.seatNumber,
          productsName: result.productsName,
          specialMeals: result.specialMeals,
          serviceName: result.serviceName,
          ancillaryServices: result.serviceName.length > 0 ? 'Yes' : 'No',
          passport: result.passport,
          DOB: result.DOB,
          passportNumber: result.passportNo,
          flightName: result.flightName,
        };
        this.passengers.push(newPass);
        this.dataSource = new MatTableDataSource(this.passengers);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  edit(id: number) {
    const index = this.passengers.findIndex((x) => x.id === id);
    const dialogRef = this.dialog.open(UpdateModalComponent, {
      width: '300px',
      data: {passData: this.passengers[index], UserType: 'admin'},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const passIndex = this.passengers.findIndex((x) => x.id === result.id);
        this.passengers[passIndex].name = result.name;
        this.passengers[passIndex].address = result.address;
        this.passengers[passIndex].seatNumber = result.seatNumber;
        this.passengers[passIndex].productsName = result.productsName;
        this.passengers[passIndex].specialMeals = result.specialMeals;
        this.passengers[passIndex].serviceName = result.serviceName;
        // eslint-disable-next-line max-len
        this.passengers[passIndex].ancillaryServices = result.serviceName.length > 0 ? 'Yes' : 'No';
        this.passengers[passIndex].passport = result.passport;
        this.passengers[passIndex].DOB = result.DOB;
        this.passengers[passIndex].passportNumber = result.passportNo;
        this.dataSource = new MatTableDataSource(this.passengers);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  delete(id: number) {
    const index = this.passengers.findIndex((x) => x.id === id);
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '300px',
      data: {name: this.passengers[index].name},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        result.forEach((element) => {
          if (element === 'AS' &&
          this.passengers[index].ancillaryServices === 'Yes') {
            this.passengers[index].serviceName = [];
          }
          if (element === 'SM' && this.passengers[index].specialMeals !== '') {
            this.passengers[index].specialMeals = '';
          }
          if (element === 'SI' && this.passengers[index].productsName !== []) {
            this.passengers[index].productsName = [];
          }
        });
      }
    });
  }

  add(id) {
    const index = this.passengers.findIndex((x) => x.id === id);

    const dialogRef = this.dialog.open(AddModalComponent, {
      width: '300px',
      data: {data: this.passengers[index], UserType: 'admin'},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const passIndex = this.passengers.findIndex((x) => x.id === result.id);
        this.passengers[passIndex].productsName =
        result.productsName.length > 0 ? result.productsName :
        this.passengers[passIndex].productsName;
        this.passengers[passIndex].specialMeals =
        result.specialMeals !== '' ?
        result.specialMeals : this.passengers[passIndex].specialMeals;
        this.passengers[passIndex].serviceName =
        result.serviceName !== undefined ?
        result.serviceName : this.passengers[passIndex].serviceName;
        this.passengers[passIndex].ancillaryServices =
        result.serviceName.length > 0 ? 'Yes' : 'No';
        this.passengers[passIndex].passport =
        result.passport !== '' ? result.passport :
        this.passengers[passIndex].passport;
        this.passengers[passIndex].DOB =
        result.DOB !== '' ? result.DOB : this.passengers[passIndex].DOB;
        this.passengers[passIndex].passportNumber = result.passportNo !== '' ?
        result.passportNo : this.passengers[passIndex].passportNumber;
        this.dataSource = new MatTableDataSource(this.passengers);
        this.dataSource.paginator = this.paginator;
      }
    });
  }
}
