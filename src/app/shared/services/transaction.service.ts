import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SessionService } from './session.service';

import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  getAll(): Observable<Transaction> {
    return this.http.get<Transaction>(`${environment.apiUrl}api/v1/transaction`);
  }

  getTransactionByUserId(): Observable<Transaction[]> {
    const token: string = this.sessionService.getSession().accessToken;
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<Transaction[]>(`${environment.apiUrl}api/v1/user/transaction`, { headers });
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    const token: string = this.sessionService.getSession().accessToken;
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Transaction>(`${environment.apiUrl}api/v1/user/transaction` , transaction, { headers })
  }
}
