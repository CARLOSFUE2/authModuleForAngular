import { TestBed } from '@angular/core/testing';

import { AuthServiceService } from '../service/auth-service.service';

describe('AuhtServicesService', () => {
  let service: AuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});