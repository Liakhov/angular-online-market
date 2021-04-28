import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';

import * as models from '../../../shared/interface';
import * as services from '../../../shared/services';
import * as constants from '../../../shared/constants';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  public carousel: models.MaterialInstance;
  @Input() images: Array<string> = [];
  @ViewChild('carousel') carouselBlock: ElementRef;


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
}
