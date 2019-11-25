import { Component, OnInit } from '@angular/core';
import { CourseSheet } from '../shared/models/course-sheet';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss']
})
export class MarketPlaceComponent implements OnInit {

  courses: CourseSheet[] = [
    new CourseSheet('Angular course', "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/220px-Angular_full_color_logo.svg.png", "Programming", "Prof X", new Date(), new Date(), 100),
    new CourseSheet('Python course', "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png", "Programming", "Prof X", new Date(), new Date(), 100),
    new CourseSheet('C++ course', "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png", "Programming", "Prof X", new Date(), new Date(), 100),
  ];

  constructor() { }

  ngOnInit() {
  }

}
