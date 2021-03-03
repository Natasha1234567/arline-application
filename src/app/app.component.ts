import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './core/login/login.component';


// eslint-disable-next-line new-cap
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  isLogin = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.isLogin = localStorage.getItem('UserType') === 'admin' ||
    localStorage.getItem('UserType') === 'airline' ? true : false;
  }


  getLoginMedium() {
    this.isLogin = true;
  }

  login() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Result', result);
    });
  }
}
