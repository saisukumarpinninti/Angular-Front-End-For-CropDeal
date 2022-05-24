/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserauthService } from './userauth.service';

describe('Service: Userauth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserauthService]
    });
  });

  it('should ...', inject([UserauthService], (service: UserauthService) => {
    expect(service).toBeTruthy();
  }));
});
