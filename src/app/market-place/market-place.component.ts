import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

import { CourseSheet } from '../shared/models/course-sheet';
import { AuthorService } from '../shared/services/author.service';
import { CourseSheetService } from '../shared/services/course-sheet.service';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss']
})
export class MarketPlaceComponent implements OnInit {

  courses: Observable<CourseSheet[]> = of([]);

  constructor(private courseSheetService: CourseSheetService, private toastr: ToastrService) { }

  ngOnInit() {
    this.courses = this.courseSheetService.getAll();
    this.courses.subscribe(
        (sheets: CourseSheet[]) => {},
        (err) => this.toastr.error('Server is down!', 'Oups')
      );
  }

}
