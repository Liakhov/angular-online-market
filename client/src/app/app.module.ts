import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { cartReducer } from './shared/store/reducers/cart.reducer';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FrontLayoutComponent } from './front/containers/front-layout/front-layout.component';
import { FrontPageComponent } from './front/components/front-page/front-page.component';
import { CartComponent } from './front/components/cart/cart.component';
import { ProductComponent } from './front/components/product/product.component';
import { ProductCartComponent } from './front/components/product-cart/product-cart.component';
import { ShopComponent } from './front/components/shop/shop.component';
import { ContactComponent } from './front/components/contact/contact.component';
import { CheckoutComponent } from './front/components/checkout/checkout.component';
import { CategoriesComponent } from './front/components/categories/categories.component';
import { PipesModule } from "./shared/pipe.module";

@NgModule({
  declarations: [
    AppComponent,
    FrontLayoutComponent,
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
    }),
    StoreDevtoolsModule.instrument()
  ],
  bootstrap: [
    AppComponent
  ],
  providers: []
})
export class AppModule { }
