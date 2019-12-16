import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSheetListComponent } from './course-sheet-list.component';

describe('CourseSheetListComponent', () => {
  let component: CourseSheetListComponent;
  let fixture: ComponentFixture<CourseSheetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSheetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
