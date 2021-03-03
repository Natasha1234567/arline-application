import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import UsersService from './../../shared/services/shared/getusers/users.service';
import {SocialAuthService, FacebookLoginProvider,
  GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {User} from '../../shared/models/user.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

// eslint-disable-next-line new-cap
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  jsonData: any;
  isClicked = false;
  user: SocialUser;
  loggedIn: boolean;
  loginData: User;
  modalData: any;

  constructor(
    private usersService: UsersService,
    private router: Router, private authService: SocialAuthService, public dialogRef: MatDialogRef<LoginComponent>) {}

  ngOnInit() {}

  login(loginType: string) {
    this.isClicked = true;
    if (loginType === 'FB') {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
      localStorage.setItem('UserType', 'admin');
    } else {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      localStorage.setItem('UserType', 'airline');
    }

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.loginData = {
        id: this.user.id,
        name: this.user.name,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        authToken: this.user.authToken,
        photoUrl: this.user.photoUrl,
        provider: this.user.provider,
      };
      console.log('loginData', this.loginData);
      this.usersService.addUser(this.loginData).subscribe((data) => {
        console.log('User successfully add', data);
        this.usersService.addLoggedUserData(this.loginData).
            subscribe((loginData) => {
              console.log('User successfully logged in ', data);
            });
      });
      localStorage.setItem('loginId', this.loginData.id);
      this.modalData = this.user;
      if (this.user.provider === 'GOOGLE') {
        this.cancel();
        this.router.navigate(['/airline']);
      } else {
        this.cancel();
        this.router.navigate(['/admin']);
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
