import { TestBed } from '@angular/core/testing';

import { CivilizationServiceService } from './civilization-service.service';

describe('CivilizationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CivilizationServiceService = TestBed.get(CivilizationServiceService);
    expect(service).toBeTruthy();
  });
});
