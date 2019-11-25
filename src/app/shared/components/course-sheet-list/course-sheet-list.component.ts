import { Component, OnInit, Input } from '@angular/core';
import { CourseSheet } from '../../models/course-sheet';

@Component({
  selector: 'app-course-sheet-list',
  templateUrl: './course-sheet-list.component.html',
  styleUrls: ['./course-sheet-list.component.scss']
})
export class CourseSheetListComponent implements OnInit {

  @Input() courses: CourseSheet[] = [];

  constructor() { }

  ngOnInit() {
  }

}
