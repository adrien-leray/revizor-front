import { Component, OnInit } from '@angular/core';
import { CourseSheet } from '../shared/models/course-sheet';
import { CourseSheetService } from '../shared/services/course-sheet.service';
import { User } from '../shared/models/user';
import { Session } from '../shared/models/session';
import { SessionService } from '../shared/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  courses: CourseSheet[] = [];
  user: User = null;

  constructor(private courseSheetService: CourseSheetService, private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    const session: Session = this.sessionService.getSession();
    if (session) {
      this.user = session.user;
    }
    this.sessionService.watchSessionChanges()
      .subscribe((session: Session) => {
        if (session) {
          this.user = session.user;
        } else {
          this.user = null;
          this.router.navigate(['/market']);
        }
      });
    this.courses = this.courseSheetService.getMyList(this.user.name);
  }

  downloadSheet(sheet: CourseSheet): void {
    // this.courseSheetService.downloadSheet(sheet.id);
  }

  editSheet(sheet: CourseSheet): void {

  }

  removeSheet(sheet: CourseSheet): void {

  }

}
