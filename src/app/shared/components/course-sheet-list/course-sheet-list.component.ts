import { Component, Input, OnInit } from '@angular/core';
import { StripeCheckoutHandler, StripeCheckoutLoader } from 'ng-stripe-checkout';

import { Router } from '@angular/router';
import { CourseSheet } from '../../models/course-sheet';
import { Transaction } from '../../models/transaction';
import { User } from '../../models/user';
import { Session } from '../../models/session';
import { TransactionService } from '../../services/transaction.service';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-course-sheet-list',
  templateUrl: './course-sheet-list.component.html',
  styleUrls: ['./course-sheet-list.component.scss']
})
export class CourseSheetListComponent implements OnInit {

  @Input() courses: CourseSheet[] = [];
  private stripeCheckoutHandler: StripeCheckoutHandler;
  user: User = null;
  isConnected: boolean = false;

  constructor(private transactionService: TransactionService, private stripeCheckoutLoader: StripeCheckoutLoader, private sessionService: SessionService, private router: Router) { }

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

  }

  public ngAfterViewInit() {
    this.stripeCheckoutLoader.createHandler({
      key: 'pk_test_Kh2vE5tMmDWNWEqRGZ9fv2vu00EQdKPiAk',
      token: (token) => {
        console.log('Payment successful!', token);
      }
    }).then((handler: StripeCheckoutHandler) => {
      this.stripeCheckoutHandler = handler;
    });
  }

  public onClickBuy(course: CourseSheet) {
    if (!this.isConnected) {
      this.router.navigate(['/login']);
    } else {
      this.stripeCheckoutHandler.open({
        amount: course.price * 100,
        currency: 'EUR',
        name: course.name,
        description: course.category,
        locale: 'FR',
      }).then((token) => {
        //Enregistrement de la transaction
        let transaction = new Transaction(parseInt(course.id));
        this.transactionService.createTransaction(transaction).subscribe(
          (test) => {},
          (err) => {console.log(err, 'erreur lors de saugarde transaction')}
        );
        console.log('Payment successful!', token);
      }).catch((err) => {
        if (err !== 'stripe_closed') {
          throw err;
        }
      });
    }
  }

  public onClickCancel() {
    this.stripeCheckoutHandler.close();
  }
}
