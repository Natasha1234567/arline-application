import {TestBed} from '@angular/core/testing';

import {GetAirlineDataService} from './get-airline-data.service';

describe('GetAirlineDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAirlineDataService = TestBed.inject(GetAirlineDataService);
    expect(service).toBeTruthy();
  });
});
