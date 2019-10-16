import { TestBed } from '@angular/core/testing';

import { StudentFormService } from './student-form.service';

describe('StudentFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentFormService = TestBed.get(StudentFormService);
    expect(service).toBeTruthy();
  });
});
