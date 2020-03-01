import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AngularEditorModule } from "@kolkov/angular-editor";

import { PipesModule } from "../../../shared/pipe.module";
import { ProductItemComponent } from "./product-item/product-item.component";
import { ProductPageComponent } from "./product-page.component";
import { SharedModule } from '../../../shared/shared.module';

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
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AngularEditorModule,
    SharedModule
  ]
})
export class ProductPageModule { }
