/* eslint-disable new-cap */
import {Component, OnInit, Input} from '@angular/core';


@Component({
  selector: 'app-checked-in-passenger',
  templateUrl: './checked-in-passenger.component.html',
  styleUrls: ['./checked-in-passenger.component.scss'],
})

export class CheckedInPassengerComponent implements OnInit {
  @Input() passengerList: any;

  constructor() { }
  ngOnInit() {
  }
}
