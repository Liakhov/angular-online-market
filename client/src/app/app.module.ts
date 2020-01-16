import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { cartReducer } from './shared/store/reducers/cart.reducer';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './shared/layouts/main/main.component';
import { AdminPanelComponent } from './shared/layouts/admin-panel/admin-panel.component';
import { FrontPageComponent } from './main/front-page/front-page.component';
import { ReviewPageComponent } from './admin/review-page/review-page.component';
import { OrderComponent } from './admin/order/order.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProductPageComponent } from './admin/product-page/product-page.component';
import { OrderItemComponent } from './admin/order/order-item/order-item.component';
import { HttpClientModule } from "@angular/common/http";
import { ProductItemComponent } from './admin/product-page/product-item/product-item.component';
import { FilterPipe } from "./shared/filter.pipe";
import { CategoryItemComponent } from './admin/category/category-item/category-item.component';
import { MailComponent} from './admin/mail/mail.component';
import { CartComponent } from './main/cart/cart.component';
import { ProductComponent } from './main/product/product.component';
import { ProductCartComponent } from './main/product-cart/product-cart.component';
import { ShopComponent } from './main/shop/shop.component';
import { ContactComponent } from './main/contact/contact.component';
import { CheckoutComponent } from './main/checkout/checkout.component';
import { MessageComponent } from './admin/message/message.component';
import { CategoriesComponent } from './main/categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
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
    MailComponent,
    CartComponent,
    ProductComponent,
    ProductCartComponent,
    ShopComponent,
    ContactComponent,
    CheckoutComponent,
    MessageComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      cart: cartReducer
    })
  ],
  bootstrap: [
    AppComponent
  ],
  providers: []
})
export class AppModule { }
