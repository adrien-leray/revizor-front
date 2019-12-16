import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Logs } from '../models/logs';
import { Session } from '../models/session';
import { User } from '../models/user';
import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private sessionService: SessionService, private router: Router, private http: HttpClient) { }

  login(logs: Logs): void {
    console.log(logs);
    this.http.post(`${environment.apiUrl}api/token/`, logs.toDto(), {})
      .subscribe((tokens: any) => {
        const user: User = new User('admin', logs.mail);
        const accessToken: string = tokens.access;
        const refreshToken: string = tokens.refresh;
        const session: Session = new Session(user, accessToken, refreshToken);
        this.sessionService.setSession(session);
        this.router.navigate(['/market']);
      },
      (err) => this.router.navigate(['/market']));

  }

  logout() {
    this.sessionService.deleteSession();
  }
}
