import { TestBed, inject } from '@angular/core/testing';

import { AtmService } from './atm.service';

describe('AtmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtmService]
    });
  });

  it('should be created', inject([AtmService], (service: AtmService) => {
    expect(service).toBeTruthy();
  }));
});
