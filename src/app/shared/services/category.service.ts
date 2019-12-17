import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Category } from '../models/category';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}api/v1/category/${id}`, {});
  }

  getCategories(): Observable<Category[]> {
    const token: string = this.sessionService.getSession().accessToken;
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Category[]>(`${environment.apiUrl}api/v1/category/`, { headers });
  }
}
