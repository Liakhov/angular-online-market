import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {switchMap, take} from 'rxjs/operators';

import * as services from '../../../../shared/services';
import * as adminService from '../../../services';
import * as models from '../../../../shared/interface';

@Component({
  selector: 'app-product-item-container',
  templateUrl: './product-item-container.component.html',
  styleUrls: ['./product-item-container.component.scss']
})
export class ProductItemContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('selectCat', {static: true}) selectCat: ElementRef;
  @ViewChild('inputImage') inputImage: ElementRef;
  public form: FormGroup;
  public isNew: boolean;
  public position;
  public id: string;
  public select: models.MaterialInstance;
  public category;
  public images = [];
  public files = [];

  constructor(
    private router: Router,
    private productService: adminService.ProductService,
    private activeRouter: ActivatedRoute,
    private categoryService: services.CategoryService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.createForm();
    await this.fetch();
    if (this.router.url === '/admin/product/new') {
      this.isNew = true;
    } else {
      this.activeRouter.params
        .pipe(
          take(1),
          switchMap(
            (params: Params) => {
              this.isNew = false;
              this.id = params.id;
              return this.productService.getByID(params.id);
            })
        )
        .subscribe(data => {
          this.patchForm(data);
          this.position = data;
          this.files = data.images || [];
          this.transformImage();
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
    this.transformImage();
  }

  private transformImage() {
    this.images = [];

    this.files.forEach(i => {
      if (i instanceof File) {
        const reader = new FileReader();
        reader.onload = () => this.images.push(reader.result);
        reader.readAsDataURL(i);
      } else {
        this.images.push(i);
      }
    });
  }

  public onRemoveImg(index: number): void {
    this.files.splice(index, 1);
    this.transformImage();
  }

  public onDndImg(event: models.DndMeta): void {
    const dndElem = this.files.splice(event.dataIndex, 1);
    this.files.splice(event.eventIndex, 0, dndElem[0]);
    this.transformImage();
  }

  public async onSubmit(): Promise<void> {
    const product: models.Product = {
      active: this.form.value.active,
      recommend: this.form.value.recommend,
      cost: this.form.value.cost,
      costOld: this.form.value.costOld,
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
        await this.router.navigate([`/admin/product`]);
      } else {
        const productUpdate = await this.productService.update(this.id, product).pipe(take(1)).toPromise();
        services.MaterialService.toast('Изменения сохранены');
        this.files = productUpdate.images;
      }
    } catch (e) {
      services.MaterialService.toast(e.message);
    }
  }

  private createForm(): void {
    this.form = new FormGroup({
      active: new FormControl(null),
      recommend: new FormControl(null),
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(0)]),
      costOld: new FormControl(null, Validators.min(0)),
      quantity: new FormControl(null, [Validators.required, Validators.min(0)]),
      category: new FormControl(null),
      description: new FormControl(null)
    });
  }

  private patchForm(data): void {
    this.form.patchValue({
      active: data.active,
      recommend: data.recommend,
      name: data.name,
      cost: data.cost,
      costOld: data.costOld,
      quantity: data.quantity,
      category: data.category,
      description: data.description
    });
  }
}
