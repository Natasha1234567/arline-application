import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {BASE_URL, JSON_SERVER_URLS} from '../../config';
const URL = BASE_URL.url;


@Injectable({
  providedIn: 'root',
})

export class GetAdminDataService {
  flightsData = new BehaviorSubject<any>([]);
  passengersData = new BehaviorSubject<any>([]);


  constructor(private http: HttpClient) {}


  getJsonData(type: string): any {
    const url = this.getUrl(type);
    return this.http.get(url);
  }

  setFlightsData(data: any) {
    this.flightsData.next(data);
  }

  getUsersData(): Observable<any> {
    return this.flightsData.asObservable();
  }

  setPassengersData(data: any) {
    this.passengersData.next(data);
  }

  getPassengersData(): Observable<any> {
    return this.passengersData.asObservable();
  }

  getUrl(type) {
    let url;
    switch (type) {
      case 'flights':
        url = URL + JSON_SERVER_URLS.flights;
        break;
      case 'passengers':
        url = URL + JSON_SERVER_URLS.passengers;
        break;
      case 'services':
        url = URL + JSON_SERVER_URLS.services;
        break;
      case 'items':
        url = URL + JSON_SERVER_URLS.shoppingItems;
        break;
      default:
        url = '';
        break;
    }
    return url;
  }
}
