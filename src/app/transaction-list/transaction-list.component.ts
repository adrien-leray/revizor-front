import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Transaction } from '../shared/models/transaction';
import { User } from '../shared/models/user';
import { Session } from '../shared/models/session';
import { TransactionService } from '../shared/services/transaction.service';
import { CourseSheetService } from '../shared/services/course-sheet.service';
import { SessionService } from '../shared/services/session.service';
import { CourseSheet } from '../shared/models/course-sheet';


@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  transactions: Array<Transaction> = [];
  courses: Array<CourseSheet> = [];
  user: User = null;
  isConnected: boolean = false;

  constructor(private courseService: CourseSheetService, private transactionService: TransactionService, private sessionService: SessionService, private router: Router) { }

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
          this.isConnected = false;
          this.router.navigate(['/market']);
        }
      });
    this.transactionService.getTransactionByUserId().subscribe(
      (transactions: Transaction[]) => {
        this.transactions = transactions;
        this.transactions.forEach(transaction => {
          this.courseService.getById(transaction.fiche.toString()).subscribe(
            (course: CourseSheet) => {this.courses.push(course);},
            (err) => console.log('Server is down!', 'Oups')
          );
        });
      },
      (err) => console.log('problems during the request of transaction', err)
    );
  }

}
