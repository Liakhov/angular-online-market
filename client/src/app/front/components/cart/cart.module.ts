import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {CommonModule} from "@angular/common";

import { CartComponent } from "./cart.component";

const routes: Routes = [
  {path: '', component: CartComponent }
]

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class CartModule { }
