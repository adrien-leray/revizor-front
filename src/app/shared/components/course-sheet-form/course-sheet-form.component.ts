import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseSheet } from '../../models/course-sheet';
import { CourseSheetService } from '../../services/course-sheet.service';

@Component({
  selector: 'app-course-sheet-form',
  templateUrl: './course-sheet-form.component.html',
  styleUrls: ['./course-sheet-form.component.scss']
})
export class CourseSheetFormComponent implements OnInit {

  form: FormGroup = null;

  @Input()
  editionMod: string = null;

  private _courseSheet = null;

  get courseSheet(): CourseSheet {
    return this._courseSheet;
  }

  @Input()
  set courseSheet(courseSheet: CourseSheet) {
    this._courseSheet = courseSheet;
    if (this.form) {
      this.form.patchValue(courseSheet);
    }
  }

  @Output('onCancel') onCancelEventEmitter = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private courseSheetService: CourseSheetService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.courseSheet ? this.courseSheet.name : '', [Validators.required]],
      image: [this.courseSheet ? this.courseSheet.image : '', [Validators.required]],
      category: [this.courseSheet ? this.courseSheet.category : '', [Validators.required]],
      author: [this.courseSheet ? this.courseSheet.author : '', [Validators.required]],
      price: [this.courseSheet ? this.courseSheet.price : '', [Validators.required]]
    });
  }

  cancelEditMode() {
    this.onCancelEventEmitter.emit();
  }

  onSubmit(): void {
    const formValue: any = this.form.value;
    const courseSheet: CourseSheet
      = new CourseSheet(formValue.name, formValue.image, formValue.category, formValue.author, formValue.price);
    courseSheet.updateDate = new Date();
    courseSheet.postDate = new Date();

    if (this.editionMod.localeCompare('Edit') !== -1) {
      this.courseSheetService.updateCourse(courseSheet).subscribe();
    } else {
      this.courseSheetService.createCourse(courseSheet).subscribe();
    }

    // close edit mode
    this.cancelEditMode();
  }

}
