/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DealerService } from './Dealer.service';

describe('Service: Dealer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealerService]
    });
  });

  it('should ...', inject([DealerService], (service: DealerService) => {
    expect(service).toBeTruthy();
  }));
});
