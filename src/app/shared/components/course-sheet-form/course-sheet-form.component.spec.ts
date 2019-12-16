import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSheetFormComponent } from './course-sheet-form.component';

describe('CourseSheetFormComponent', () => {
  let component: CourseSheetFormComponent;
  let fixture: ComponentFixture<CourseSheetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSheetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSheetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
