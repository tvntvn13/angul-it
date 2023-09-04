import { TestBed } from '@angular/core/testing';

import { ResultGuardService } from './result-guard.service';

describe('ResultGuardService', () => {
  let service: ResultGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
