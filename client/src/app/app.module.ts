import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { cartReducer } from './shared/store/reducers/cart.reducer';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './shared/layouts/main/main.component';
import { FrontPageComponent } from './main/front-page/front-page.component';
import { CartComponent } from './main/cart/cart.component';
import { ProductComponent } from './main/product/product.component';
import { ProductCartComponent } from './main/product-cart/product-cart.component';
import { ShopComponent } from './main/shop/shop.component';
import { ContactComponent } from './main/contact/contact.component';
import { CheckoutComponent } from './main/checkout/checkout.component';
import { CategoriesComponent } from './main/categories/categories.component';
import {PipesModule} from "./shared/pipe.module";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FrontPageComponent,
    CartComponent,
    ProductComponent,
    ProductCartComponent,
    ShopComponent,
    ContactComponent,
    CheckoutComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PipesModule,
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
