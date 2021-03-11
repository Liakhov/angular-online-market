import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {OrderContainerComponent} from './order-container.component';
import {OrderItemContainerComponent} from './order-item-container/order-item-container.component';
import {SharedModule} from '../../../shared/shared.module';
import {PipesModule} from '../../../shared/pipe.module';

const routes: Routes = [
  {path: '', component: OrderContainerComponent},
  {path: ':id', component: OrderItemContainerComponent}
];

@NgModule({
  declarations: [
    OrderContainerComponent,
    OrderItemContainerComponent
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
export class OrderContainerModule {
}
