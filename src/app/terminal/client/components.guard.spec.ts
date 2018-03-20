import { TestBed, async, inject } from '@angular/core/testing';

import { ComponentsGuard } from './components.guard';

describe('ComponentsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentsGuard]
    });
  });

  it('should ...', inject([ComponentsGuard], (guard: ComponentsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
