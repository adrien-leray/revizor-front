import { Component, OnInit } from '@angular/core';
import { CourseSheet } from '../shared/models/course-sheet';
import { CourseSheetService } from '../shared/services/course-sheet.service';
import { User } from '../shared/models/user';
import { Session } from '../shared/models/session';
import { SessionService } from '../shared/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sheet-editor',
  templateUrl: './sheet-editor.component.html',
  styleUrls: ['./sheet-editor.component.scss']
})
export class SheetEditorComponent implements OnInit {

  courses: CourseSheet[] = [];
  user: User = null;
  isConnected: boolean = false;
  onEdit = false;
  editedItem: CourseSheet = null;

  constructor(private courseSheetService: CourseSheetService, private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    const session: Session = this.sessionService.getSession();
    if (session) {
      this.user = session.user;
      this.isConnected = true;
    }
    this.sessionService.watchSessionChanges()
      .subscribe((session: Session) => {
        if (session) {
          this.user = session.user;
          this.isConnected = true;
        } else {
          this.user = null;
          this.editedItem = null;
          this.isConnected = false;
          this.router.navigate(['/market']);
        }
      });
    this.courses = this.courseSheetService.getMyList(this.user.name);
  }

  downloadSheet(sheet: CourseSheet): void {
    this.courseSheetService.downloadSheet(sheet);
  }

  removeSheet(sheet: CourseSheet): void {
    this.editedItem = null;
    this.onEdit = false;
    this.courseSheetService.removeCourse(sheet);
  }

  activateEditMode(course: CourseSheet): void {
    this.editedItem = course;
    this.onEdit = true;
  }

  deactivateEditMode(): void {
    this.onEdit = false;
    this.editedItem = null;
  }
}
