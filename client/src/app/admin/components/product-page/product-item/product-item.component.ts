import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";

import * as services from '../../../../shared/services/index';
import * as models from '../../../../shared/interface';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild('selectCat', {static: true}) selectCat: ElementRef
  @ViewChild('inputImage', {static: false}) inputImage: ElementRef
  form: FormGroup
  isNew: boolean
  position
  id: string
  select: models.MaterialInstance
  category
  submitSub: Subscription
  removeSub: Subscription
  files = []

  constructor(
    private router: Router,
    private ProductService: services.ProductService,
    private activeRouter: ActivatedRoute,
    private categoryService: services.CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.fetch().subscribe(data => {
      this.category = data
    })

    if(this.router.url === '/admin/product/new'){
      this.isNew = true
    }else{
      this.activeRouter.params
        .pipe(
          switchMap(
            (params: Params) => {
                this.isNew = false
                this.id = params.id;
                return this.ProductService.getByID(params['id'])
            })
        )
        .subscribe(data => {
          this.form.patchValue({
            name: data.name,
            cost: data.cost,
            quantity: data.quantity,
            category: data.category,
            description: data.description
          })
          this.position = data
        })
    }

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(0)]),
      quantity: new FormControl(null, [Validators.required, Validators.min(0)]),
      category: new FormControl(null),
      description: new FormControl(null)
    })
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.select = services.MaterialService.initSelect(this.selectCat)
    },500)
  }

  ngOnDestroy(){
    if(this.select){
      this.select.destroy()
    }
    if(this.submitSub){
      this.submitSub.unsubscribe()
    }
    if(this.removeSub){
      this.removeSub.unsubscribe()
    }
  }

  remove(): void{
    this.removeSub = this.ProductService.remove(this.id).subscribe(
      response => services.MaterialService.toast(response.message),
      error => services.MaterialService.toast(error.message),
      () => this.router.navigate(['/admin/product'])
    )
  }

  public onFilesUpload(event){
    this.files = event;
  }


  onSubmit() {
      let obs$

      const product: models.Product = {
        cost: this.form.value.cost,
        name: this.form.value.name,
        quantity: this.form.value.quantity,
        images: this.files
      }

      if(this.form.value.category){
        product.category = this.form.value.category
      }
      if(this.form.value.description){
        product.description = this.form.value.description
      }

      if(this.isNew){
        obs$ = this.ProductService.create(product)
      }else{
        obs$ = this.ProductService.update(this.id, product)
      }

      this.submitSub = obs$.subscribe(() => {
        if(this.isNew){
          services.MaterialService.toast('Новый товар добавлен')
          this.router.navigate([`/admin/product`])
        }else{
          services.MaterialService.toast('Изменения сохранены')
        }
      })
  }
}
