/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CropServiceService } from './CropService.service';

describe('Service: CropService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CropServiceService]
    });
  });

  it('should ...', inject([CropServiceService], (service: CropServiceService) => {
    expect(service).toBeTruthy();
  }));
});
