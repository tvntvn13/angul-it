import { TestBed } from '@angular/core/testing';

import { SamesiteService } from './samesite.service';

describe('SamesiteService', () => {
  let service: SamesiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SamesiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
