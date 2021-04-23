import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {switchMap, take} from 'rxjs/operators';

import * as services from '../../../../shared/services';
import * as adminService from '../../../services';
import * as models from '../../../../shared/interface';

@Component({
  selector: 'app-brand-item-container',
  templateUrl: './brand-item-container.component.html',
  styleUrls: ['./brand-item-container.component.scss']
})
export class BrandItemContainerComponent implements OnInit {
  @ViewChild('inputImage') inputImage: ElementRef;
  public form: FormGroup;
  public isNew: boolean;
  public brand: models.Brand;
  public id: string;
  public images = [];
  public files = [];

  constructor(
    private router: Router,
    private brandService: adminService.BrandService,
    private activeRouter: ActivatedRoute
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.createForm();

    if (this.router.url === '/admin/brands/add') {
      this.isNew = true;
    } else {
      this.activeRouter.params
        .pipe(
          take(1),
          switchMap(
            (params: Params) => {
              this.isNew = false;
              this.id = params.id;
              return this.brandService.getById(params.id);
            })
        )
        .subscribe(data => {
          this.patchForm(data);
          this.brand = data;
          if (data.logo) {
            this.files[0] = data.logo;
          }
          this.transformImage();
        });
    }
  }

  public async remove(): Promise<void> {
    const result = confirm('Вы уверены, что хотите удалить?');

    if (result) {
      try {
        const response = await this.brandService.remove(this.id).pipe(take(1)).toPromise();
        services.MaterialService.toast(response.message);
        await this.router.navigate(['/admin/brands']);
      } catch (e) {
        services.MaterialService.toast(e.message);
      }
    }
  }

  public onFilesUpload(event): void {
    this.files = this.files.concat(event);
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
    const brand: models.Brand = {
      active: this.form.value.active,
      name: this.form.value.name,
      description: this.form.value.description || '',
      logo: this.files[0]
    };

    try {
      if (this.isNew) {
        await this.brandService.create(brand).pipe(take(1)).toPromise();
        services.MaterialService.toast('Новый бренд добавлен');
        await this.router.navigate([`/admin/brands`]);
      } else {
        const productUpdate = await this.brandService.update(this.id, brand).pipe(take(1)).toPromise();
        services.MaterialService.toast('Изменения сохранены');
        this.files[0] = productUpdate.logo;
      }
    } catch (e) {
      services.MaterialService.toast(e.message);
    }
  }

  private createForm(): void {
    this.form = new FormGroup({
      active: new FormControl(false),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null)
    });
  }

  private patchForm(data): void {
    this.form.patchValue({
      active: data.active,
      name: data.name,
      description: data.description
    });
  }
}
