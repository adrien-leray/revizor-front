import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseSheet } from '../../models/course-sheet';
import { CourseSheetService } from '../../services/course-sheet.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { of, Observable } from 'rxjs';
import { Author } from '../../models/author';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-course-sheet-form',
  templateUrl: './course-sheet-form.component.html',
  styleUrls: ['./course-sheet-form.component.scss']
})
export class CourseSheetFormComponent implements OnInit {

  form: FormGroup = null;
  fileToUpload: File = null;

  private _editionMod: string = null;
  onEdit = false;
  onAdd = false;

  get editionMod(): string {
    return this._editionMod;
  }

  @Input()
  set editionMod(editionMod: string) {
    this._editionMod = editionMod;
    if (editionMod.localeCompare('Edit')) {
      this.onAdd = false;
      this.onEdit = true;
    } else {
      this.onEdit = false;
      this.onAdd = true;
    }
  }

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

  categories: Observable<Category[]> = of([]);
  authors: Observable<Author[]> = of([]);

  @Output('onCancel') onCancelEventEmitter = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private courseSheetService: CourseSheetService, private categoryService: CategoryService, private authorService: AuthorService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      author: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });

    if (this.courseSheet) {
      this.courseSheet.category.subscribe((category: Category) => {
        this.courseSheet.author.subscribe((author: Author) => {
          this.form.patchValue({
            name: this.courseSheet.name,
            category: category.id,
            author: author.id,
            price: this.courseSheet.price,
          });
        });
      });
    } else {
      this.form.patchValue({
        author: 'You',
      });
    }

    this.categories = this.categoryService.getCategories();
    this.authors = this.authorService.getAuthors();
  }

  cancelEditMode() {
    this.onCancelEventEmitter.emit();
  }

  onSubmit(): void {
    const formValue: any = this.form.value;
    const courseSheet: CourseSheet
      = new CourseSheet(formValue.name, this.fileToUpload, formValue.category, formValue.author, formValue.price);
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

}
