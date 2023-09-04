import { TestBed } from '@angular/core/testing';

import { LevelGuardService } from './level-guard.service';

describe('LevelGuardService', () => {
  let service: LevelGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
