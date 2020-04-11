import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {OrderComponent} from './order.component';
import {OrderItemComponent} from './order-item/order-item.component';
import {SharedModule} from '../../../shared/shared.module';
import {PipesModule} from '../../../shared/pipe.module';

const routes: Routes = [
  {path: '', component: OrderComponent},
  {path: ':id', component: OrderItemComponent}
];

@NgModule({
  declarations: [
    OrderComponent,
    OrderItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class OrderModule { }
