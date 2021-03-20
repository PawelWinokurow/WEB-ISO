import { TestBed } from '@angular/core/testing';

import { JSONValidationService } from './json-validation.service';

describe('JSONValidationService', () => {
  let service: JSONValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JSONValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
