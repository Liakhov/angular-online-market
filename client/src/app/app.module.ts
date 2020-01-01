import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MarketComponent } from './shared/layouts/market/market.component';
import { AdminPanelComponent } from './shared/layouts/admin-panel/admin-panel.component';
import { FrontPageComponent } from './front/front-page/front-page.component';
import { ReviewPageComponent } from './admin/review-page/review-page.component';
import { OrderComponent } from './admin/order/order.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProductPageComponent } from './admin/product-page/product-page.component';
import { OrderItemComponent } from './admin/order/order-item/order-item.component';
import {HttpClientModule} from "@angular/common/http";
import { ProductItemComponent } from './admin/product-page/product-item/product-item.component';
import {FilterPipe} from "./shared/filter.pipe";
import { CategoryItemComponent } from './admin/category/category-item/category-item.component';
// import * as $ from 'jquery';
import { MailComponent} from './admin/mail/mail.component';

@NgModule({
  declarations: [
    AppComponent,
    MarketComponent,
    AdminPanelComponent,
    FrontPageComponent,
    ReviewPageComponent,
    OrderComponent,
    CategoryComponent,
    ProductPageComponent,
    OrderItemComponent,
    ProductItemComponent,
    FilterPipe,
    CategoryItemComponent,
    MailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: []
})
export class AppModule { }
