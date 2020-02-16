import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../../shared/services/product.service";
import {switchMap} from "rxjs/operators";
import {MaterialInstance, MaterialService} from "../../../../shared/services/material.service";
import {CategoryService} from "../../../../shared/services/category.service";
import {Product} from 'src/app/shared/interface';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild('selectCat', {static: true}) selectCat: ElementRef
  @ViewChild('descr', {static: true}) descrTextArea: ElementRef
  form: FormGroup
  isNew: boolean
  position
  id: string
  select: MaterialInstance
  category
  submitSub: Subscription
  removeSub: Subscription
  imagePreview

  constructor(private router: Router, private ProductService: ProductService, private activeRouter: ActivatedRoute, private categoryService: CategoryService) { }

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
          MaterialService.resizeTextArea(this.descrTextArea);
        })
    }

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)]),
      quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
      category: new FormControl(null),
      description: new FormControl(null)
    })
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.select = MaterialService.initSelect(this.selectCat)
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

  remove(){
    this.removeSub = this.ProductService.remove(this.id).subscribe(
      response => MaterialService.toast(response.message),
      error => MaterialService.toast(error.message),
      () => this.router.navigate(['/admin/product'])
    )
  }

  onFileUpload(event: Event){
    console.log(event)
  }

  onSubmit(){
      let obs$

      const product: Product = {
        cost: this.form.value.cost,
        name: this.form.value.name,
        quantity: this.form.value.quantity
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
          MaterialService.toast('Новый товар добавлен')
          this.router.navigate([`/admin/product`])
        }else{
          MaterialService.toast('Изменения сохранены')
        }
      })
  }
}
