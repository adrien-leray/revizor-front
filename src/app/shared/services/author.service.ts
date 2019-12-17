import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Author } from '../models/author';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  getAuthor(id: string): Observable<Author> {
    return this.http.get<Author>(`${environment.apiUrl}api/v1/author/${id}`, {});
  }

  getAuthors(): Observable<Author[]> {
    const token: string = this.sessionService.getSession().accessToken;
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Author[]>(`${environment.apiUrl}api/v1/author/`, { headers });
  }
}
