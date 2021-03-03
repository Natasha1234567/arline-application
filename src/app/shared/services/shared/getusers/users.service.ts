/* eslint-disable new-cap */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BASE_URL, JSON_SERVER_URLS} from '../../../config';
import {EMPTY, Observable} from 'rxjs';
import {User} from 'src/app/shared/models/user.model';
const URL = BASE_URL.url;
const USERS = URL + JSON_SERVER_URLS.users;
const LOGGED_USERS = URL + JSON_SERVER_URLS.loggedUser;

@Injectable({
  providedIn: 'root',
})

export default class UsersService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(USERS);
  }

  addUser(user: User): Observable<any> {
    let userr;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.getUsers().subscribe((data) => {
      console.log('data', data);
      userr = data.find( (x) => x.id === user.id);
    });

    return userr ? EMPTY : this.http.post<User[]>(USERS, user, httpOptions);
  }

  addLoggedUserData(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<User[]>(LOGGED_USERS, user, httpOptions);
  }

  deleteLoggedUserData(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    // tslint:disable-next-line: max-line-length
    return this.http.delete<any>(LOGGED_USERS + '/delete/' + id, httpOptions);
  }
}
