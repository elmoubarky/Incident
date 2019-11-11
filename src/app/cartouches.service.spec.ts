import { TestBed } from '@angular/core/testing';

import { CartouchesService } from './cartouches.service';

describe('CartouchesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartouchesService = TestBed.get(CartouchesService);
    expect(service).toBeTruthy();
  });
});
