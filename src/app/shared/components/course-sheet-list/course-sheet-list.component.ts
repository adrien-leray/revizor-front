import { Component, Input, OnInit } from '@angular/core';
import { StripeCheckoutHandler, StripeCheckoutLoader } from 'ng-stripe-checkout';

import { CourseSheet } from '../../models/course-sheet';

@Component({
  selector: 'app-course-sheet-list',
  templateUrl: './course-sheet-list.component.html',
  styleUrls: ['./course-sheet-list.component.scss']
})
export class CourseSheetListComponent implements OnInit {

  @Input() courses: CourseSheet[] = [];
  private stripeCheckoutHandler: StripeCheckoutHandler;

  constructor(private stripeCheckoutLoader: StripeCheckoutLoader) { }

  ngOnInit() {

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
    this.stripeCheckoutHandler.open({
      amount: course.price * 100,
      currency: 'EUR',
      name: course.name,
      description: course.category,
      locale: 'FR',

    }).then((token) => {
      console.log('Payment successful!', token);
    }).catch((err) => {
      if (err !== 'stripe_closed') {
        throw err;
      }
    });
  }

  public onClickCancel() {
    this.stripeCheckoutHandler.close();
  }
}
