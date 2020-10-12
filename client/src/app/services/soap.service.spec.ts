import { TestBed } from '@angular/core/testing';

import { SOAPService } from './soap.service';

describe('SOAPService', () => {
  let service: SOAPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SOAPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
