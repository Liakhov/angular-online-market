import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { ShopComponent } from "./shop.component";
import { ProductCartComponent } from "../product-cart/product-cart.component";
import { PipesModule } from "../../../shared/pipe.module";

const routes: Routes = [
  {path: '', component: ShopComponent }
]

@NgModule({
  declarations: [
    ShopComponent,
    ProductCartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    PipesModule,
    ReactiveFormsModule
  ]
})

export class ShopModule {}
