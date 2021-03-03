import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule, MatDialogRef,
  MAT_DIALOG_DATA} from '@angular/material/dialog';

import {UndoCheckInComponent} from './undo-check-in.component';

const dialogMock = {close: () => { }};
describe('UndoCheckInComponent', () => {
  let component: UndoCheckInComponent;
  let fixture: ComponentFixture<UndoCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UndoCheckInComponent],
      imports: [MatDialogModule, MatCheckboxModule, ReactiveFormsModule],
      providers: [{provide: MatDialogRef, useValue: dialogMock},
        {provide: MAT_DIALOG_DATA, useValue: {}}],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndoCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getSelectedValue', () => {
    const event = {source: {name: 'yes'}};
    component.getSelectedValue(event);
  });

  it('cancel', () => {
    component.cancel();
  });
});
