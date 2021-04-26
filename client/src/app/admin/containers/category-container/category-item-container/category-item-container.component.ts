import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {switchMap, take} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import * as services from '../../../services';
import * as sharedServices from '../../../../shared/services';
import * as models from '../../../../shared/interface';

@Component({
  selector: 'app-category-item-container',
  templateUrl: './category-item-container.component.html',
  styleUrls: ['./category-item-container.component.scss']
})
export class CategoryItemContainerComponent implements OnInit {
  @ViewChild('textarea') textarea: ElementRef;
  public form: FormGroup;
  public isNew: boolean;
  private image: File;
  public imagePreview: string | ArrayBuffer;
  public products$: Observable<models.Product[]>;
  private category: models.Category;
  private catId: string;

  constructor(
    private router: Router,
    private categoryService: sharedServices.CategoryService,
    private productService: services.ProductService,
    private activeRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.createForm();

    if (this.router.url === '/admin/category/new') {
      this.isNew = true;
    } else {
      this.activeRouter.params
        .pipe(
          take(1),
          switchMap(
            (params: Params) => {
              this.form.disable();
              if (params.id) {
                this.isNew = false;
                this.catId = params.id;
                return this.categoryService.getByID(params.id);
              }
              return of(null);
            }
          )
        )
        .subscribe(category => {
            if (category) {
              this.category = category;
              this.patchForm(category);
              sharedServices.MaterialService.resizeTextArea(this.textarea);
              if (category.image && category.image !== 'null') {
                this.imagePreview = category.image;
              }
              this.form.enable();
            }
          },
          error => {
            console.log(error);
          });
    }
    this.products$ = this.productService.fetch({category: this.catId});
  }

  public onFileUpload(event) {
    const target = event.target;
    const file = target.files[0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result;
    reader.readAsDataURL(file);
  }

  public async onSubmit(): Promise<void> {
    const {value} = this.form;
    if (this.isNew) {
      const data = await this.categoryService
        .create(value.name, value.description, this.image)
        .pipe(take(1))
        .toPromise();
      sharedServices.MaterialService.toast(data.message);
      await this.router.navigate(['/admin/category']);
    } else {
      await this.categoryService
        .update(this.category._id, value.name, value.description, this.image)
        .pipe(take(1))
        .toPromise();
      sharedServices.MaterialService.toast('Изменения сохранены');
    }
  }

  public async remove(): Promise<void> {
    const data = await this.categoryService.remove(this.category._id).pipe(take(1)).toPromise();
    sharedServices.MaterialService.toast(data.message);
    await this.router.navigate(['/admin/category']);
  }

  public onRemove(): void {
    this.image = null;
    this.imagePreview = null;
  }

  private createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null)
    });
  }

  private patchForm(category: models.Category): void {
    this.form.patchValue({
      name: category.name,
      description: category.description
    });
  }
}
