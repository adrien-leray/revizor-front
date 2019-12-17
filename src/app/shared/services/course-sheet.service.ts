import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { CourseSheet } from '../models/course-sheet';
import { SessionService } from './session.service';
import { AuthorService } from './author.service';
import { CategoryService } from './category.service';

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

  courses: CourseSheet[] = [];

  constructor(private http: HttpClient, private sessionService: SessionService, private authorService: AuthorService, private categoryService: CategoryService) { }

  getAll(): Observable<CourseSheet[]> {
    return this.http.get<CourseSheet[]>(`${environment.apiUrl}api/v1/fiches`, {})
      .pipe(map(sheets => sheets.map(sheet => {
        sheet.author = this.authorService.getAuthor(sheet.author);
        sheet.category = this.categoryService.getCategory(sheet.category);
        return CourseSheet.toModel(sheet);
      })));
  }

  getMyList(): Observable<CourseSheet[]> {
    const token: string = this.sessionService.getSession().accessToken;
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CourseSheet[]>(`${environment.apiUrl}api/v1/user/fiche`, { headers })
      .pipe(map(sheets => sheets.map((sheet: CourseSheet) => {
            sheet.author = this.authorService.getAuthor(sheet.author);
            sheet.category = this.categoryService.getCategory(sheet.category);
            return CourseSheet.toModel(sheet);
      })));
  }

  getById(id: string): Observable<CourseSheet> {
    return this.http.get<CourseSheet>(`${environment.apiUrl}api/v1/fiches/${id}`, {})
      .pipe(map(sheet => CourseSheet.toModel(sheet)));
  }

  createCourse(sheet: CourseSheet): Observable<CourseSheet> {
    const token: string = this.sessionService.getSession().accessToken;
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log(sheet);

    const formData = new FormData();
    formData.append('name', sheet.name);
    formData.append('category', sheet.category);
    formData.append('author', sheet.author);
    formData.append('publication_date', sheet.postDate.toISOString());
    formData.append('updated_date', sheet.updateDate.toISOString());
    formData.append('price', sheet.price.toString());
    formData.append('image', sheet.image, sheet.image.name);

    return this.http.post<CourseSheet>(`${environment.apiUrl}api/v1/fiches`, formData, { headers });
  }

  updateCourse(sheet: CourseSheet): Observable<CourseSheet> {
    const token: string = this.sessionService.getSession().accessToken;
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<CourseSheet>(`${environment.apiUrl}api/v1/fiches/${sheet.id}`, sheet.toDto(), { headers });
  }

  removeCourse(sheet: CourseSheet): Observable<CourseSheet> {
    const token: string = this.sessionService.getSession().accessToken;
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<CourseSheet>(`${environment.apiUrl}api/v1/fiches/${sheet.id}`, { headers });
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
