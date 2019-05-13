import { TestBed, async, inject } from '@angular/core/testing';

import { AllowsEditGuard } from './allows-edit.guard';

describe('AllowsEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllowsEditGuard]
    });
  });

  it('should ...', inject([AllowsEditGuard], (guard: AllowsEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
