import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

import * as models from '../../../shared/interface';
import * as services from '../../../shared/services';
import * as constants from '../../../shared/constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('carousel', {static: false}) carouselBlock: ElementRef;
  carousel: models.MaterialInstance;
  product: models.Product;
  productSub: Subscription;
  id: string;
  images: [];
  loading = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: services.ProductService
  ) { }

  ngOnInit(): void {
    this.loading = true;

    this.productSub = this.activeRoute.data.subscribe(data => {
      this.product = data.product;
      this.images = data.product.images;
      this.loading = false;
    });
  }


  ngAfterViewInit(): void {
    this.carousel = services.MaterialService.initSlider(this.carouselBlock, constants.PRODUCT_SLIDER);
  }

  ngOnDestroy(): void {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
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
