/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FarmerService } from './Farmer.service';

describe('Service: Farmer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarmerService]
    });
  });

  it('should ...', inject([FarmerService], (service: FarmerService) => {
    expect(service).toBeTruthy();
  }));
});
