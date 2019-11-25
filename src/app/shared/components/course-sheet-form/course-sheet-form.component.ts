import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseSheet } from '../../models/course-sheet';

@Component({
  selector: 'app-course-sheet-form',
  templateUrl: './course-sheet-form.component.html',
  styleUrls: ['./course-sheet-form.component.scss']
})
export class CourseSheetFormComponent implements OnInit {

  form: FormGroup = null;
  @Input() courseSheet: CourseSheet = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.courseSheet ? this.courseSheet.name : '', [Validators.required]],
      image: [this.courseSheet ? this.courseSheet.image : '', [Validators.required]],
      category: [this.courseSheet ? this.courseSheet.category : '', [Validators.required]],
      author: [this.courseSheet ? this.courseSheet.author : '', [Validators.required]],
      price: [this.courseSheet ? this.courseSheet.price : '', [Validators.required]]
    });
  }

}
