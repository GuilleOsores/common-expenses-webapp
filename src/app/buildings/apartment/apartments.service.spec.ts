import { TestBed, inject } from '@angular/core/testing';

import { ApartmentsService } from './apartments.service';

describe('ApartmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApartmentsService]
    });
  });

  it('should be created', inject([ApartmentsService], (service: ApartmentsService) => {
    expect(service).toBeTruthy();
  }));
});
