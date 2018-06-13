import { TestBed, inject } from '@angular/core/testing';

import { TranslocationService } from './translocation.service';

describe('TranslocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslocationService]
    });
  });

  it('should be created', inject([TranslocationService], (service: TranslocationService) => {
    expect(service).toBeTruthy();
  }));
});
