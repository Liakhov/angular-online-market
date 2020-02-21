import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FrontLayoutComponent } from "./containers/front-layout/front-layout.component";
import { FrontPageComponent } from "./components/front-page/front-page.component";
import { ShopComponent } from "./components/shop/shop.component";
import { ProductComponent } from "./components/product/product.component";
import { ProductCartComponent } from "./components/product-cart/product-cart.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { PipesModule } from "../shared/pipe.module";


const routes: Routes = [
  {
    path: '',
    component: FrontLayoutComponent,
    children: [
      {path: '', component: FrontPageComponent, pathMatch: 'full'},
      {path: 'shop', component: ShopComponent},
      {path: 'shop/:id', component: ProductComponent},
      {path: 'category/:id', component: CategoriesComponent},
      {path: 'cart', loadChildren: './components/cart/cart.module#CartModule'},
      {path: 'checkout', loadChildren: './components/checkout/checkout.module#CheckoutModule'},
      {path: 'contact', loadChildren: './components/contact/contact.module#ContactModule'}
    ]
  }
]

@NgModule({
  declarations: [
    FrontLayoutComponent,
    FrontLayoutComponent,
    FrontPageComponent,
    ProductComponent,
    ProductCartComponent,
    ShopComponent,
    CategoriesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class FrontModule { }
