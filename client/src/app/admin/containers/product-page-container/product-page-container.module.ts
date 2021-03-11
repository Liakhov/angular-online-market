import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AngularEditorModule} from '@kolkov/angular-editor';

import {ProductItemContainerComponent} from './product-item-container/product-item-container.component';
import {ProductPageContainerComponent} from './product-page-container.component';
import {SharedModule} from '../../../shared/shared.module';
import {PipesModule} from '../../../shared/pipe.module';

const routes: Routes = [
  {path: '', component: ProductPageContainerComponent},
  {path: ':id', component: ProductItemContainerComponent},
  {path: 'new', component: ProductItemContainerComponent}
];

@NgModule({
  declarations: [
    ProductPageContainerComponent,
    ProductItemContainerComponent
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
export class ProductPageContainerModule {
}
