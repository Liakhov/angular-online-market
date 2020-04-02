import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: any;

  constructor(private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.data.subscribe(data => {
      this.products = data.shop;
    });
  }

}
