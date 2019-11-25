import { Injectable } from '@angular/core';
import { CourseSheet } from '../models/course-sheet';

export const COURSES_SHEET_STUB: CourseSheet[] = [
  new CourseSheet('Angular course', "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/220px-Angular_full_color_logo.svg.png", "Programming", "Prof X", new Date(), new Date(), 100),
  new CourseSheet('Python course', "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png", "Programming", "Prof X", new Date(), new Date(), 100),
  new CourseSheet('C++ course', "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png", "Programming", "Prof X", new Date(), new Date(), 100),
];

@Injectable({
  providedIn: 'root'
})
export class CourseSheetService {

  courses: CourseSheet[] = COURSES_SHEET_STUB;

  constructor() { }

  getAll(): CourseSheet[] {
    return this.courses;
  }

  getById(id: string): CourseSheet {
    return this.courses.find((course: CourseSheet) => course.id === id);
  }

  createCourse(course: CourseSheet): CourseSheet {
    this.courses.push(course);
    return this.getById(course.id);
  }

  updateCourse(course: CourseSheet): CourseSheet {
    this.courses[course.id] = course;
    return this.courses[course.id];
  }

  removeCourse(course: CourseSheet): void {
    const index: number = this.courses.indexOf(course);
    if (index !== -1) {
      this.courses.splice(index, 1);
    }
  }
}
