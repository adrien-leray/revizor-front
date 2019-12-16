import { Injectable } from '@angular/core';
import { Session } from '../models/session';
import { Subject, Observable } from 'rxjs';

export const SESSION_KEY: string = 'Session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  existingSession: Subject<Session> = new Subject<Session>();

  constructor() { }

  getSession(): Session {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) as Session;
  }

  setSession(session: Session): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    this.existingSession.next(session);
  }

  deleteSession(): void {
    localStorage.removeItem(SESSION_KEY);
    this.existingSession.next(null);
  }

  watchSessionChanges(): Observable<Session> {
    return this.existingSession.asObservable();
  }
}
