import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {CartContainerComponent} from './cart-container.component';

const routes: Routes = [
  {path: '', component: CartContainerComponent}
];

@NgModule({
  declarations: [
    CartContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})

export class CartContainerModule { }
