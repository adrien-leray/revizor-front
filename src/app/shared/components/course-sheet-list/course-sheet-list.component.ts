import { Component, OnInit, Input } from '@angular/core';
import { CourseSheet } from '../../models/course-sheet';
import { CourseSheetService } from '../../services/course-sheet.service';

@Component({
  selector: 'app-course-sheet-list',
  templateUrl: './course-sheet-list.component.html',
  styleUrls: ['./course-sheet-list.component.scss']
})
export class CourseSheetListComponent implements OnInit {

  @Input() courses: CourseSheet[] = [];
  onEdit = false;
  editedItem: CourseSheet = null;

  constructor(private courseSheetService: CourseSheetService) { }

  ngOnInit() {
  }

  activateEditMode(course: CourseSheet): void {
    this.editedItem = course;
    this.onEdit = true;
  }

  deactivateEditMode(): void {
    this.onEdit = false;
    this.editedItem = null;
  }

  removeItem(course: CourseSheet): void {
    this.editedItem = null;
    this.onEdit = false;
    this.courseSheetService.removeCourse(course);
  }

}
