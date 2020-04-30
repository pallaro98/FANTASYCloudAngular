import { TestBed } from '@angular/core/testing';

import { LineupsService } from './lineups.service';

describe('LineupsService', () => {
  let service: LineupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
