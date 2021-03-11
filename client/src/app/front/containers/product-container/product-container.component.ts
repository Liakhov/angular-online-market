import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import * as models from '../../../shared/interface';
import * as services from '../../../shared/services';
import * as constants from '../../../shared/constants';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.scss']
})
export class ProductContainerComponent implements OnDestroy, AfterViewInit {
  public carousel: models.MaterialInstance;
  public product$: Observable<models.Product>;
  @ViewChild('carousel') carouselBlock: ElementRef;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: services.ProductService
  ) {
    this.product$ = this.activeRoute.data.pipe(map(data => data.product));
  }


  ngAfterViewInit(): void {
    this.carousel = services.MaterialService.initSlider(this.carouselBlock, constants.PRODUCT_SLIDER);
  }

  ngOnDestroy(): void {
    if (this.carousel) {
      this.carousel.destroy();
    }
  }

  @HostListener('window:resize', ['$event']) onResize(): void {
    this.carousel = services.MaterialService.initSlider(this.carouselBlock, constants.PRODUCT_SLIDER);
  }

  public addToCart(product): void {
    this.productService.addCart(product);
  }
}
