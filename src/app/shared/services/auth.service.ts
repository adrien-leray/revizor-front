import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Logs } from '../models/logs';
import { Session } from '../models/session';
import { User } from '../models/user';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private sessionService: SessionService, private router: Router) { }

  login(logs: Logs): void {
    // process login api call

    // stub
    const user: User = new User('admin', 'admin@yopmail.com');
    const token: string = 'fake_token';
    const session: Session = new Session(user, token);
    this.sessionService.setSession(session);

    this.router.navigate(['/market']);
  }

  logout() {
    this.sessionService.deleteSession();
  }
}
