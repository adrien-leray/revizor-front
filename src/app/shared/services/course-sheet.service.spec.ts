import { TestBed } from '@angular/core/testing';

import { CourseSheetService } from './course-sheet.service';

describe('CourseSheetListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseSheetService = TestBed.get(CourseSheetService);
    expect(service).toBeTruthy();
  });
});
