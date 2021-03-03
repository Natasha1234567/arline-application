import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {RouterTestingModule} from '@angular/router/testing';
import {SocialAuthService, SocialLoginModule} from 'angularx-social-login';
import {AppComponent} from './app.component';
import {FooterComponent} from './core/footer/footer.component';
import {HeaderComponent} from './core/header/header.component';

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

xdescribe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
      ],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        MatIconModule,
        SocialLoginModule,
        HttpClientTestingModule,
      ],
      providers: [
        [{provide: SocialAuthService, useClass: AuthServiceMock}],
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('ngonInit with userType as Airline', () => {
    localStorage.setItem('UserType', 'airline');
    app.ngOnInit();
  });

  it('ngonInit with userType as Admin', () => {
    localStorage.setItem('UserType', 'admin');
    app.ngOnInit();
  });

  it('ngonInit with userType as test', () => {
    localStorage.setItem('UserType', 'test');
    app.ngOnInit();
  });

  it('getLoginMedium', () => {
    app.getLoginMedium();
  });
});
