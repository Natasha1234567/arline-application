import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckedInPassengerComponent} from './checked-in-passenger.component';

describe('CheckedInPassengerComponent', () => {
  let component: CheckedInPassengerComponent;
  let fixture: ComponentFixture<CheckedInPassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckedInPassengerComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckedInPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
