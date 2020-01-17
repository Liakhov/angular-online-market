import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category, Product} from "../../shared/interface";
import {CategoryService} from "../../shared/services/category.service";
import {Observable} from "rxjs";
import {MaterialInstance, MaterialService} from "../../shared/services/material.service";
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
  host: {
    '(window:resize)': 'onResize()'
  }
})

export class FrontPageComponent implements OnInit, AfterViewInit, OnDestroy{

  categories$: Observable<Category[]>
  products$: Observable<Product[]>
  @ViewChild('slider', {static: false}) sliderBlock: ElementRef
  slider: MaterialInstance
  limit = 4

  constructor(private categoriesService: CategoryService, private productService: ProductService) {
  }

  ngOnInit() {

    this.categories$ = this.categoriesService.fetch()

    this.products$ = this.productService.fetch({
      limit: this.limit
    })
  }

  ngAfterViewInit(){
    this.slider = MaterialService.initSlider(this.sliderBlock)
  }

  ngOnDestroy(): void {
    if(this.slider){
      this.slider.destroy()
    }
  }

  onResize(event: Event){
    this.slider = MaterialService.initSlider(this.sliderBlock)
  }

}
