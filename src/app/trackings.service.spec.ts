import { TestBed } from '@angular/core/testing';

import { TrackingsService } from './trackings.service';

describe('TrackingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrackingsService = TestBed.get(TrackingsService);
    expect(service).toBeTruthy();
  });
});
