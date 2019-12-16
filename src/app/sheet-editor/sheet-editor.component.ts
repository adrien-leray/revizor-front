import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';

import { CourseSheet } from '../shared/models/course-sheet';
import { Session } from '../shared/models/session';
import { User } from '../shared/models/user';
import { CourseSheetService } from '../shared/services/course-sheet.service';
import { SessionService } from '../shared/services/session.service';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-sheet-editor',
  templateUrl: './sheet-editor.component.html',
  styleUrls: ['./sheet-editor.component.scss']
})
export class SheetEditorComponent implements OnInit {

  @ViewChild('courseSheet', { static: false })
  courseSheet: ElementRef;

  courses: Observable<CourseSheet[]> = of([]);
  user: User = null;
  isConnected: boolean = false;
  onEdit = false;
  onAdd = false;
  editionMod: string = null;
  sheet: CourseSheet = null;

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
          this.sheet = null;
          this.isConnected = false;
          this.router.navigate(['/market']);
        }
      });
    this.courses = this.courseSheetService.getMyList(this.user.name);
  }

  getImgFromUrl(logo_url, callback) {
    const img = new Image();
    img.src = logo_url;
    img.onload = () => {
      callback(img);
    };
  }

  downloadSheet(sheet: CourseSheet): void {
    this.sheet = sheet;
    this.getImgFromUrl(sheet.image, (img) => {
      this.generatePDF(sheet, img);
    });
  }

  generatePDF(sheet: CourseSheet, image: any) {
    const sheetTemplate: any = this.courseSheet.nativeElement;

    setTimeout(() => {
      const doc = new jsPDF();
      const template = sheetTemplate.innerHTML;
      console.log(template);
      doc.fromHTML(template, 15, 15, { width: 190 });
      doc.addImage(image, 'image/png', 150, 20, 32, 32);
      doc.save(`${sheet.name.split(' ').join('-').toLowerCase()}-${this.formatDate(sheet.postDate)}.pdf`);
    }, 1000);
  }

  removeSheet(sheet: CourseSheet): void {
    this.sheet = null;
    this.onEdit = false;
    this.courseSheetService.removeCourse(sheet);
  }

  activateEditMode(course: CourseSheet): void {
    if (course) {
      this.sheet = course;
      this.onEdit = true;
      this.editionMod = 'Edit';
    } else {
      this.onEdit = false;
      this.onAdd = true;
      this.editionMod = 'Add';
    }
    console.log(course, this.onEdit, this.onAdd);
  }

  deactivateEditMode(): void {
    this.onAdd = false;
    this.onEdit = false;
    this.sheet = null;
  }

  formatDate(date: Date) {
    let d = date;
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }
}
