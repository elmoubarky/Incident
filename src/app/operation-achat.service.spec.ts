import { TestBed } from '@angular/core/testing';

import { OperationAchatService } from './operation-achat.service';

describe('OperationAchatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperationAchatService = TestBed.get(OperationAchatService);
    expect(service).toBeTruthy();
  });
});
