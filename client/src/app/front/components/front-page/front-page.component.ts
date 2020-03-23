import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, HostListener } from '@angular/core';
import { Observable } from "rxjs";

import * as services from '../../../shared/services';
import * as models from '../../../shared/interface';
import * as constants from '../../../shared/constants';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
})

export class FrontPageComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild('slider', {static: false}) sliderBlock: ElementRef
  categories$: Observable<models.Category[]>
  products$: Observable<models.Product[]>
  slider: models.MaterialInstance
  limit = 4

  constructor(private categoriesService: services.CategoryService, private productService: services.ProductService) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch()

    this.products$ = this.productService.fetch({
      limit: this.limit
    })
  }

  ngAfterViewInit(): void {
    this.slider = services.MaterialService.initSlider(this.sliderBlock, constants.PRODUCT_SLIDER)
  }

  ngOnDestroy(): void {
    if(this.slider){
      this.slider.destroy()
    }
  }

  @HostListener('window:resize', ['$event'])  onResize(): void {
    this.slider = services.MaterialService.initSlider(this.sliderBlock, constants.PRODUCT_SLIDER)
  }
}
