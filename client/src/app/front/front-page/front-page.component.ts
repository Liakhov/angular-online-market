import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category, Product} from "../../shared/interface";
import {CategoryService} from "../../shared/services/category.service";
import {Observable} from "rxjs";
import {MaterialInstance, MaterialService} from "../../shared/services/material.service";
import {Store, select} from '@ngrx/store';
import {Add} from '../../shared/store/actions/cart.action';
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})

export class FrontPageComponent implements OnInit, AfterViewInit, OnDestroy{

  cart$: Observable<[]>;
  categories$: Observable<Category[]>
  products$: Observable<Product[]>
  @ViewChild('slider', {static: false}) sliderBlock: ElementRef
  slider: MaterialInstance

  constructor(private store: Store<{ cart: [] }>, private categoriesService: CategoryService, private productService: ProductService) {
    this.cart$ = store.pipe(select('cart'));
  }

  ngOnInit() {

    this.categories$ = this.categoriesService.fetch()

    this.products$ = this.productService.fetch()

  }

  ngAfterViewInit(){
    this.slider = MaterialService.initSlider(this.sliderBlock)
  }

  ngOnDestroy(): void {
    if(this.slider){
      this.slider.destroy()
    }
  }

  add(product){

    this.store.dispatch(Add(product._id))
  }


}
