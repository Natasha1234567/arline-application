import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {RouterTestingModule} from '@angular/router/testing';
import {SocialAuthService, SocialLoginModule, SocialUser} from 'angularx-social-login';
import {HeaderComponent} from './header.component';

xdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const user: SocialUser = {
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule,
        MatDialogModule,
        SocialLoginModule,
        HttpClientTestingModule,
        MatIconModule],
      providers: [SocialAuthService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const service = fixture.componentRef.injector.get(SocialAuthService);
    // tslint:disable-next-line: no-unused-expression
    service.authState.subscribe(() => {});
    // const spy = spyOn(service, 'authState').and.callThrough();
    expect(component).toBeTruthy();
  });
});
