import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from "rxjs";

import * as services from '../../../shared/services/index';
import * as models from '../../../shared/interface';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
  host: {
    '(window:resize)': 'onResize()'
  }
})

export class FrontPageComponent implements OnInit, AfterViewInit, OnDestroy{

  categories$: Observable<models.Category[]>
  products$: Observable<models.Product[]>
  @ViewChild('slider', {static: false}) sliderBlock: ElementRef
  slider: models.MaterialInstance
  limit = 4

  constructor(private categoriesService: services.CategoryService, private productService: services.ProductService) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch()

    this.products$ = this.productService.fetch({
      limit: this.limit
    })
  }

  ngAfterViewInit(){
    this.slider = services.MaterialService.initSlider(this.sliderBlock)
  }

  ngOnDestroy(): void {
    if(this.slider){
      this.slider.destroy()
    }
  }

  onResize(event: Event){
    this.slider = services.MaterialService.initSlider(this.sliderBlock)
  }
}
