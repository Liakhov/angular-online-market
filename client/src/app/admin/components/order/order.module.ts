import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderComponent} from './order.component';
import {OrderItemComponent} from './order-item/order-item.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';

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
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrderModule { }
