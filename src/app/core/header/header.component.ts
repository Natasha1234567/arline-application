import {Component, OnInit} from '@angular/core';
import {SocialAuthService} from 'angularx-social-login';
import {Router} from '@angular/router';
import UsersService from 'src/app/shared/services/shared/getusers/users.service';

// eslint-disable-next-line new-cap
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  isLogin: boolean;

  constructor(private authService: SocialAuthService,
              private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((data) => {
      // tslint:disable-next-line: max-line-length
      this.isLogin = data !== null ?
      (localStorage.getItem('UserType') === 'admin' ||
      localStorage.getItem('UserType') === 'airline') ? true : false : false;
    });
  }

  logout() {
    this.authService.signOut().then(() => {
      const id = localStorage.getItem('loginId');
      this.userService.deleteLoggedUserData(id).subscribe((data) => {
      });
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }).catch((err) => console.log(err));
  }
}
