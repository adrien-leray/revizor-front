import { Component, OnInit } from '@angular/core';
import { CourseSheet } from '../shared/models/course-sheet';
import { CourseSheetService } from '../shared/services/course-sheet.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  courses: CourseSheet[] = [];
  user: User = null;

  constructor(private courseSheetService: CourseSheetService) { }

  ngOnInit() {
    this.courses = this.courseSheetService.getMyList(this.user.name);
  }

}
