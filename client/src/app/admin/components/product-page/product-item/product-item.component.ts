import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {switchMap, take} from 'rxjs/operators';

import * as services from '../../../../shared/services';
import * as models from '../../../../shared/interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('selectCat', {static: true}) selectCat: ElementRef;
  @ViewChild('inputImage', {static: false}) inputImage: ElementRef;
  form: FormGroup;
  isNew: boolean;
  position;
  id: string;
  select: models.MaterialInstance;
  category;
  images = [];
  public files = [];

  constructor(
    private router: Router,
    private productService: services.ProductService,
    private activeRouter: ActivatedRoute,
    private categoryService: services.CategoryService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.fetch();
    if (this.router.url === '/admin/product/new') {
      this.isNew = true;
    } else {
      this.activeRouter.params
        .pipe(
          switchMap(
            (params: Params) => {
              this.isNew = false;
              this.id = params.id;
              return this.productService.getByID(params['id']);
            })
        )
        .subscribe(data => {
          this.form.patchValue({
            name: data.name,
            cost: data.cost,
            quantity: data.quantity,
            category: data.category,
            description: data.description
          });
          this.images = data.images;
          this.files = data.images;
          this.position = data;
        });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.select = services.MaterialService.initSelect(this.selectCat);
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.select) {
      this.select.destroy();
    }
  }

  public async fetch(): Promise<void> {
    try {
      this.category = await this.categoryService.fetch().pipe(take(1)).toPromise();
    } catch (e) {
      services.MaterialService.toast(e.message);
    }
  }

  public async remove(): Promise<void> {
    const result = confirm('Вы уверены, что хотите удалить?');

    if (result) {
      try {
        const response = await this.productService.remove(this.id).pipe(take(1)).toPromise();
        services.MaterialService.toast(response.message);
        this.router.navigate(['/admin/product']);
      } catch (e) {
        services.MaterialService.toast(e.message);
      }
    }
  }

  public onFilesUpload(event): void {
    const imgFiles = [];
    this.files.forEach(i => imgFiles.push(i));
    this.files = imgFiles.concat(event);
  }

  public onRemoveImg(index: number): void {
    console.log(this.files);
    this.files.splice(index, 1);
    console.log(this.files);
  }

  public onDndImg(event): void {
    const dndElem = this.files.splice(event.dataIndex, 1);
    this.files.splice(event.eventIndex, 0, dndElem[0]);
  }

  public async onSubmit(): Promise<void> {
    const product: models.Product = {
      cost: this.form.value.cost,
      name: this.form.value.name,
      quantity: this.form.value.quantity,
      images: this.files
    };

    if (this.form.value.category) {
      product.category = this.form.value.category;
    }
    if (this.form.value.description) {
      product.description = this.form.value.description;
    }

    try {
      if (this.isNew) {
        await this.productService.create(product).pipe(take(1)).toPromise();
        services.MaterialService.toast('Новый товар добавлен');
        this.router.navigate([`/admin/product`]);
      } else {
        const productUpdate = await this.productService.update(this.id, product).pipe(take(1)).toPromise();
        services.MaterialService.toast('Изменения сохранены');
        this.files = productUpdate.images;
        this.images = productUpdate.images;
      }
    } catch (e) {
      services.MaterialService.toast(e.message);
    }
  }

  private createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(0)]),
      quantity: new FormControl(null, [Validators.required, Validators.min(0)]),
      category: new FormControl(null),
      description: new FormControl(null)
    });
  }
}
