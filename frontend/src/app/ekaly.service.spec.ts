import { TestBed } from '@angular/core/testing';

import { EkalyService } from './ekaly.service';

describe('EkalyService', () => {
  let service: EkalyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EkalyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
