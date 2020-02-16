import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProductPageComponent} from "./product-page.component";
import {ProductItemComponent} from "./product-item/product-item.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../../../shared/pipe.module";

const routes: Routes = [
  {path: '', component: ProductPageComponent},
  {path: ':id', component: ProductItemComponent},
  {path: 'new', component: ProductItemComponent}
]

@NgModule({
  declarations: [
    ProductPageComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductPageModule { }
