import { Component, OnInit } from '@angular/core';
import { CourseSheet } from '../shared/models/course-sheet';
import { CourseSheetService } from '../shared/services/course-sheet.service';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss']
})
export class MarketPlaceComponent implements OnInit {

  courses: CourseSheet[] = [];

  constructor(private courseSheetService: CourseSheetService) { }

  ngOnInit() {
    this.courses = this.courseSheetService.getAll();
  }

}
