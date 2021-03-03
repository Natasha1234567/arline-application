import { HttpClient } from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterTestingModule} from '@angular/router/testing';
import {SocialAuthService, SocialLoginModule} from 'angularx-social-login';
import { of } from 'rxjs';
import UsersService from 'src/app/shared/services/shared/getusers/users.service';
import {LoginComponent} from './login.component';


class AuthServiceMock {
  private providers;
  authState(): any {
    const user = {
      provider: 'GOOGLE',
      id: '4324324255',
      email: 'bit.natasha04@gmail.com',
      name: 'natasha',
      photoUrl: '',
      firstName: 'natasha',
      lastName: 'mansharamani',
      authToken: 'safsfsdgfdhgfj',
      idToken: '43343543564657',
      authorizationCode: '435',
    };
    return user;
  }
  signIn(providerId: any) {}
  signOut() {}
}

class MockUsersService {
  addUser() {}
  addLoggedUserData() {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
 // let spy;
  const user = { provider: 'GOOGLE',
  id: '4324324255',
  email: 'bit.natasha04@gmail.com',
  name: 'natasha',
  photoUrl: '',
  firstName: 'natasha',
  lastName: 'mansharamani',
  authToken: 'safsfsdgfdhgfj',
  idToken: '43343543564657',
  authorizationCode: '435'};

  beforeEach(async(() => {
   // spy = jasmine.createSpyObj('SocialAuthService', []);
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SocialLoginModule,
        MatDialogModule],
      providers: [
        [{provide: SocialAuthService, useClass: AuthServiceMock}],
    [{provide: UsersService, useClass: MockUsersService}]],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('login', () => {
   // spy.authState = of(user);
    // const service = fixture.componentRef.injector.get(SocialAuthService);
    // const spy = spyOn(service, 'signIn').and.callThrough();
    // // service.authState;
    // const spy1 = spyOn(service, authState).and.callThrough();
    component.login('FB');
  //   expect(spy).toHaveBeenCalled();
  });
});
