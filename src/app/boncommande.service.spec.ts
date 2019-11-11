import { TestBed } from '@angular/core/testing';

import { BoncommandeService } from './boncommande.service';

describe('BoncommandeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoncommandeService = TestBed.get(BoncommandeService);
    expect(service).toBeTruthy();
  });
});
