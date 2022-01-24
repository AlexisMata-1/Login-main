import { TestBed } from '@angular/core/testing';

import { Vigilant2Guard } from './vigilant2.guard';

describe('Vigilant2Guard', () => {
  let guard: Vigilant2Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Vigilant2Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
