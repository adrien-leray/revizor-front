import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Session } from '../../models/session';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isConnected: boolean = false;

  constructor(private sessionService: SessionService, private authService: AuthService) { }

  ngOnInit() {
    const session: Session = this.sessionService.getSession();
    if (session) {
      this.isConnected = true;
    }

    this.sessionService.watchSessionChanges()
      .subscribe((session: Session) => this.isConnected = session ? true : false);
  }

  logout(): void {
    this.authService.logout();
  }

}
