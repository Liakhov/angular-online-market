import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import * as models from '../../../shared/interface';
import * as services from '../../../shared/services';
import * as constants from '../../../shared/constants';

import {AppState} from '../../../store/app.state';
import * as actions from '../../store/actions/cart.action';

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
    private store: Store<AppState>
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
    const item: models.Position = {
      _id: product._id,
      name: product.name,
      cost: product.cost,
      image: product.images[0] || '',
      quantity: 1
    };
    this.store.dispatch(new actions.Add(item));
  }
}
