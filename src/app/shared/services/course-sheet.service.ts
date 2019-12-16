import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CourseSheet } from '../models/course-sheet';

export const COURSES_SHEET_STUB: CourseSheet[] = [
  new CourseSheet('Angular course', "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/220px-Angular_full_color_logo.svg.png", "Programming", "Prof X", 100),
  new CourseSheet('Python course', "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png", "Programming", "Prof X", 100),
  new CourseSheet('C++ course', "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png", "Programming", "Prof X", 100),
  new CourseSheet('C++ course', "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png", "Programming", "admin", 100),
  new CourseSheet('Fluter course', "https://lh3.googleusercontent.com/F5B6GGdo6tAVNApr2X2p35igQhYBouuPA3uuIu3LEPHsIl7JPMHA1sn4-5J2B78JWA=s180", "Programming", "admin", 100),
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

  getMyList(id: string): CourseSheet[] {
    return this.courses.filter((course: CourseSheet) => course.author === id);
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

  exportSheet(sheet: CourseSheet): void {
    const markdownContent = `
      ![Image de la fiche](${sheet.image} "Image de la fiche")

      ## INFOS 
      
      __Nom:__ ${sheet.name}

      __Catégorie:__ ${sheet.category}

      __Auteur:__ ${sheet.author}

      __Date de publication:__ ${sheet.postDate}

      __Date de la dernière mise-à-jour:__ ${sheet.updateDate}

      __Tarif:__ ${sheet.price}€
    `;

    this.downloadFile(markdownContent, `${sheet.name.split(' ').join('-').toLowerCase()}-${this.formatDate(sheet.postDate)}.pdf`, 'application/pdf');
  }

  downloadFile(data, filename, type): void {
    let file = new Blob([this.str2ab(data)], { type });

    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file, filename);
    } else { // Others
      const a = document.createElement('a');
      const url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
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

  str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
}
