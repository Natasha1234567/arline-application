import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {User} from 'src/app/shared/models/user.model';
import GetUsersService from '../../shared/getusers/users.service';

describe('GetUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]}));

  it('should be created', () => {
    // tslint:disable-next-line: deprecation
    const service: GetUsersService = TestBed.inject(GetUsersService);
    expect(service).toBeTruthy();
  });

  it('getUsers', () => {
    const service: GetUsersService = TestBed.inject(GetUsersService);
    service.getUsers();
  });
  it('addUser', () => {
    const user: User = {
      id: '534536346447',
      name: 'Savita Nankani',
      firstName: 'Savita',
      lastName: 'Nankani',
      email: 'savita@gmail.com',
      authToken: '46576787980dfdfdgfh',
      photoUrl: '',
      provider: 'GOOGLE',
    };
    const result = [{
      id: '534536346447',
      name: 'Savita Nankani',
      firstName: 'Savita',
      lastName: 'Nankani',
      email: 'savita@gmail.com',
      authToken: '46576787980dfdfdgfh',
      photoUrl: '',
      provider: 'GOOGLE',
    }];
    const service: GetUsersService = TestBed.inject(GetUsersService);
    const spy = spyOn(service, 'getUsers').and.returnValue(of(result));
    service.addUser(user);
    expect(spy).toHaveBeenCalled();
  });


  it('addLoggedUserData', () => {
    const user: User = {
      id: '534536346447',
      name: 'Savita Nankani',
      firstName: 'Savita',
      lastName: 'Nankani',
      email: 'savita@gmail.com',
      authToken: '46576787980dfdfdgfh',
      photoUrl: '',
      provider: 'GOOGLE',
    };
    const service: GetUsersService = TestBed.inject(GetUsersService);
    service.addLoggedUserData(user);
  });

  it('deleteLoggedUserData', () => {
    const service: GetUsersService = TestBed.inject(GetUsersService);
    service.deleteLoggedUserData('534536346447');
  });


  it('addUser to add a user', () => {
    const user: User = {
      id: '534536346447',
      name: 'Savita Nankani',
      firstName: 'Savita',
      lastName: 'Nankani',
      email: 'savita@gmail.com',
      authToken: '46576787980dfdfdgfh',
      photoUrl: '',
      provider: 'GOOGLE',
    };
    const result = [{
      id: '534536346445',
      name: 'Dinesh Nankani',
      firstName: 'Dinesh',
      lastName: 'Nankani',
      email: 'dinesh@gmail.com',
      authToken: '46576787980dfdfdgfh65544',
      photoUrl: '',
      provider: 'FACEBOOK',
    }];
    const service: GetUsersService = TestBed.inject(GetUsersService);
    const spy = spyOn(service, 'getUsers').and.returnValue(of(result));
    service.addUser(user);
    expect(spy).toHaveBeenCalled();
  });
});
