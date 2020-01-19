import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderComponent} from "./order.component";
import {OrderItemComponent} from "./order-item/order-item.component";
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: OrderComponent},
  {path: ':id', component: OrderItemComponent}
]

@NgModule({
  declarations: [
    OrderComponent,
    OrderItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrderModule { }
